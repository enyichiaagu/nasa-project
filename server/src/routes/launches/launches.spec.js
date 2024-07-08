import request from 'supertest';
import app from '../../app.js';

describe('Test GET /launches', () => {
	test('It should respond with 200 Success', async () => {
		const response = await request(app).get('/launches');
		expect(response.statusCode).toBe(200);
	});
});

describe('Test POST /launches', () => {
	test('It should respond with 200 Success', () => {});

	test('It should catch missing required properties', () => {});
	test('It should catch invalid dates', () => {});
});
