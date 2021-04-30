const request = require('supertest');
const mongoose = require('mongoose');
const { Category } = require('../../src/models/category')
const { User } = require('../../src/models/user');

let server;
describe('/api/categories', () => {

    beforeEach(() => { server = require('../../src/index'); })
    afterEach(async () => {
        await server.close();
        await Category.remove({});
    });
    describe('GET /', () => {
        it('should return all categories', async () => {
            Category.collection.insertMany([
                { name: 'category1' },
                { name: 'category2' },
                { name: 'category3' },
            ]);
            const res = await request(server).get('/api/categories');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            expect(res.body.some(g => g.name === 'category1'));
            expect(res.body.some(g => g.name === 'category2'));
            expect(res.body.some(g => g.name === 'category3'));
        });
    });
    describe('GET /:id', () => {
        it('should return a category with given id', async () => {
            const category = new Category({ name: 'category1' });
            await category.save();

            const res = await request(server).get('/api/categories/' + category._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', category.name);
        });

        it('should return 404 if invalid category is passed', async () => {
            const res = await request(server).get('/api/categories/1');
            expect(res.status).toBe(404);
        });
        it('should return 404 if no category with the given id is exist', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/categories/' + id);
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {

        let token;
        let name;

        const exec = async () => {
            return await request(server)
                .post('/api/categories')
                .set('x-auth-token', token)
                .send({ name });
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'category1';
        })

        it('should return 401 if user not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if category is less than 5 characters', async () => {
            name = '1234'
            const res = await exec();
            expect(res.status).toBe(400)
        });

        it('should return 400 if category is more than 50 characters', async () => {

            name = new Array(55).join('a');
            const res = await exec();
            expect(res.status).toBe(400)
        });

        it('should save the category if it is valid', async () => {

            await exec();

            const category = await Category.find({ name: 'category1' });
            expect(category).not.toBeNull();
        });

        it('should return the category if it is valid', async () => {
            await exec();
            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'category1');
        });
    });

    describe('PUT /:id', () => {
        let token;
        let newName;
        let category;
        let id;

        const exec = async () => {
            return await request(server)
                .put('/api/categories/' + id)
                .set('x-auth-token', token)
                .send({ name: newName });
        }

        beforeEach(async () => {
            category = new Category({ name: 'category1' });
            await category.save();
            token = new User().generateAuthToken();
            id = category._id;
            newName = 'updateName';
        });

        it('should return 401 if user not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if category is less than 5 characters', async () => {
            newName = '1234'
            const res = await exec();
            expect(res.status).toBe(400)
        });

        it('should return 400 if category is more than 50 characters', async () => {

            newName = new Array(55).join('a');
            const res = await exec();
            expect(res.status).toBe(400)
        });
    });
});