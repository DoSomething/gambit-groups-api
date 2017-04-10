'use strict';

require('dotenv').config();

const request = require('supertest');
const helper = require('./helpers/test-helper');
const app = require('../app');
const util = require('../lib/util');

const qry = ({
  campaign_id: 12,
  campaign_run_id: 234,
  environment: 'thor',
});
const apiPath = '/api/v1/mobilecommons-groups/';
const apiKey = process.env.API_KEY;

describe('/lib/routes/api', () => {
  it('should allow a valid api key', (done) => {
    let key = util.groupKeyGen(qry.campaign_id, qry.campaign_run_id, 'doing', qry.environment);
    // Ignoring query param as a hack, nock keeps thinking the request isn't defined here.
    helper.nockGetGroupSuccess(helper.getGroup(key), true);
    key = util.groupKeyGen(qry.campaign_id, qry.campaign_run_id, 'completed', qry.environment);
    helper.nockGetGroupSuccess(helper.getGroup(key), true);

    request(app)
      .get(apiPath)
      .query(qry)
      .set('Accept', 'application/json')
      .set('x-messaging-group-api-key', apiKey)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should not allow an invalid api key', (done) => {
    request(app)
      .get(apiPath)
      .query(qry)
      .set('Accept', 'application/json')
      .set('x-messaging-group-api-key', 'nope')
      .expect(403, done);
  });

  it('should not allow missing query parameters', (done) => {
    delete qry.campaign_id;
    request(app)
      .get(apiPath)
      .query(qry)
      .set('Accept', 'application/json')
      .set('x-messaging-group-api-key', apiKey)
      .expect(422, done);
  });
});
