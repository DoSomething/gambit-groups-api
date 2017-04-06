require('dotenv').config();

const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('api access', function() {
  it ('should allow a valid api key', function(done) {
    request(app)
      .get('/api/v1/')
      .set('Accept', 'application/json')
      .set('x-messaging-group-api-key', process.env.API_KEY)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it ('should not allow an invalid api key', function(done) {
    request(app)
      .get('/api/v1/')
      .set('Accept', 'application/json')
      .set('x-messaging-group-api-key', 'nope')
      .expect(403, done);
  });
});
