import request from 'supertest';
import initHttpServerApp from '../../src/backend';

let server;

beforeEach(() => {
  server = initHttpServerApp();
});

test('GET-request to index page', async () => {
  const response = await request(server).get('/');

  expect(response.status).toBe(200);
});
