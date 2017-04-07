'use strict';

const assert = require('assert');
const util = require('../lib/util');

describe('validation', () => {
  it('should validate a field in the container', () => {
    assert(util.validate(['test'], { test: 'value' }) === true);
  });

  it('should not validate a field missing in the container', () => {
    assert(util.validate(['test'], { foo: 'bar' }) === false);
  });

  it('should not validate an undefined container', () => {
    assert(util.validate([], undefined) === false);
    assert(util.validate([], '') === false);
  });
});

describe('key generation', () => {
  it('should return a properly formulated key', () => {
    const expectedKeyValue = 'campaign_id=10 run_id=11 field=doing env=local';
    assert(util.groupKeyGen(10, 11, 'local', 'doing') === expectedKeyValue);
  });
});
