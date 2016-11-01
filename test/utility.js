const assert = require('assert');
const util = require('../lib/util');

describe('validation', function () {
  it ('should validate a field in the container', function () {
    assert(util.validate(['test'], {test: 'value'}) === true);
  });

  it ('should not validate a field missing in the container', function () {
    assert(util.validate(['test'], {foo: 'bar'}) === false);
  });

  it ('should not validate an undefined container', function () {
    assert(util.validate([], undefined) === false);
    assert(util.validate([], '') === false);
  });
});

describe('key generation', function () {
 it ('should return a properly formulated key', function() {
   assert(util.groupKeyGen(10, 11, 'local', 'doing') === 'campaign_id=10 run_id=11 field=doing env=local');
 });
});

describe('validate api key', function () {
  it ('should validate a real api key', function () {
    const headers = {'x-messaging-group-api-key': process.env.API_KEY};
    assert(util.validateApiKey(headers) === true);
  });

  it ('should not validate a fake api key', function () {
    const headers = {'x-messaging-group-api-key': 'foobar'};
    assert(util.validateApiKey(headers) === false);
    assert(util.validateApiKey(undefined) === false);
  });
});
