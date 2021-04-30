const { toNumber } = require('lodash');
const request = require('supertest');
const { User } = require('../../src/models/user');
const { Category } = require('../../src/models/category')

describe('auth middleware', () => {

    beforeEach(() => { server = require('../../src/index') })
    afterEach(async () => {
        server.close();
        await Category.remove({});
    });

    let token;

    const exec = () => {
        return request(server)
            .post('/api/categories')
            .set('x-auth-token', token)
            .send({ name: 'category1' })
    };

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    it('should return 401 if no token is provide', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'invalidToken';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });
})