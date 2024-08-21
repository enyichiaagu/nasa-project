import request from 'supertest';
import app from '../../app.js';
import { mongoConnect, mongoDisconnect } from '../../services/mongo.js';

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /launches', () => {
    test('It should respond with 200 Success', async () => {
      await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('Test POST /launches', async () => {
    const launchData = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-62 f',
    };
    const invalidDateData = { ...launchData, launchDate: 'hello' };
    const completeLaunchData = { ...launchData, launchDate: 'January 4, 2028' };

    test('It should respond with 201 Created', async () => {
      const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);

      expect(response.body).toMatchObject(launchData);
    });

    test('It should catch missing required properties', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing required launch property',
      });
    });

    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/launches')
        .send(invalidDateData)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toStrictEqual({ error: 'Invalid launch date' });
    });
  });
});
