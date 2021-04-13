let server;
const request = require('supertest');
const { Category } = require('../../src/models/category')

describe('/api/categories', () => {

    beforeEach(() => { server = require('../../src/index') })
    afterEach(async () => {
        server.close();
        await Category.remove({});
    })

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
        });

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
        })
    });
});