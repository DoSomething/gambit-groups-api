'use strict';

require('dotenv').config();

const request = require('supertest');
const app = require('../../app');

const query = ({
  campaign_id: 2273,
  campaign_run_id: 6431,
  environment: 'thor',
});
const apiPath = '/api/v1/mobilecommons-groups/';

describe('api access', () => {
  it('should allow a valid api key', (done) => {
    request(app)
      .get(apiPath)
      .query(query)
      .set('Accept', 'application/json')
      .set('x-messaging-group-api-key', process.env.API_KEY)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should not allow an invalid api key', (done) => {
    request(app)
      .get(apiPath)
      .query(query)
      .set('Accept', 'application/json')
      .set('x-messaging-group-api-key', 'nope')
      .expect(403, done);
  });
  // TODO: Add tests for 422, missing query params.
});
