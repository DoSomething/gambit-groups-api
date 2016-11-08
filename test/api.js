require('dotenv').config();

const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const Group = require('../lib/group');

describe('api access', function() {
  it ('should allow a valid api key', function(done) {
    request(app)
      .get('/api/v1/')
      .set('Accept', 'application/json')
      .set('x-gambit-group-api-key', process.env.API_KEY)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it ('should not allow an invalid api key', function(done) {
    request(app)
      .get('/api/v1/')
      .set('Accept', 'application/json')
      .set('x-gambit-group-api-key', 'nope')
      .expect(403, done);
  });
});

describe('api get group', function() {
  it ('should find a group for the given campaign id & run id', function(done) {
    const testGroup = new Group({
      campaign_id: 10,
      campaign_run_id: 20,
      mobilecommons_groups: {
        local: {
          completed: 1,
          doing: 1
        },
        thor: {
          completed: 1,
          doing: 1
        },
        production: {
          completed: 1,
          doing: 1
        }
      }
    });

    testGroup.save();

    request(app)
      .get('/api/v1/group/10/20')
      .set('Accept', 'application/json')
      .set('x-gambit-group-api-key', process.env.API_KEY)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        assert(res.body._id);
        assert(res.body.campaign_id === 10);
        assert(res.body.mobilecommons_groups.production.completed);
        assert(res.body.mobilecommons_groups.thor.doing);
        assert(res.body.mobilecommons_groups.local.completed);
        done();
      });
  });

  it('should not find a group for a non existant campaign id & run id', function(done) {
    request(app)
      .get('/api/v1/group/-1/-2')
      .set('Accept', 'application/json')
      .set('x-gambit-group-api-key', process.env.API_KEY)
      .expect(404, done);
  });
});

describe('api post group', function() {
  const campaignId = Math.random() * 10000000;
  const campaignRunId = campaignId + 1;

  it ('should create a group for the given campaign id & run id', function(done) {
    request(app)
      .post('/api/v1/group')
      .set('Accept', 'application/json')
      .set('x-gambit-group-api-key', process.env.API_KEY)
      .send({campaign_id: campaignId, campaign_run_id: campaignRunId})
      .expect('Content-Type', /json/)
      .expect(200, done);
  }).timeout(5000);

  it ('should not create a group for the duplicate campaign id & run id', function(done) {
    request(app)
      .post('/api/v1/group')
      .set('Accept', 'application/json')
      .set('x-gambit-group-api-key', process.env.API_KEY)
      .send({campaign_id: campaignId, campaign_run_id: campaignRunId})
      .expect(400, done);
  });

  it ('should not create a group for the missing run id', function(done) {
    request(app)
      .post('/api/v1/group')
      .set('Accept', 'application/json')
      .set('x-gambit-group-api-key', process.env.API_KEY)
      .send({campaign_id: campaignId})
      .expect(400, done);
  });
});
