const request = require('supertest');
const app = require('../src/app');
let token;

beforeAll(async () => {
    // Register and login a user to get the token
    await request(app).post('/auth/register').send({ username: 'test', password: 'password' });
    const res = await request(app).post('/auth/login').send({ username: 'test', password: 'password' });
    token = res.body.token;
});

describe('Task API', () => {
    it('should create a new task', async () => {
        const res = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Task',
                description: 'Test Description',
                due_date: '2024-12-01',
            });

        expect(res.status).toBe(201);
        expect(res.body.title).toBe('Test Task');
    });
});
