'use strict';

require('dotenv').config();

const assert = require('assert');
const mobilecommons = require('../../lib/mobilecommons');
const helper = require('../helpers/test-helper');

describe('/lib/mobilecommons', () => {
  describe('#getGroup', () => {
    it('should return an object when groupName found', () => {
      const name = helper.getExistingDoingGroupName('doing');
      mobilecommons.getGroup(name).then((res) => {
        assert(typeof res === 'object');
        assert(res.id === helper.getExistingDoingGroupId());
        assert(res.name === name);
        assert(res.status === 'active');
        assert(res.size === 0);
      });
    });
    it('should return an error when groupName not found', () => {
      const name = helper.getNonExistingGroupName();
      mobilecommons.getGroup(name)
        .then(res => assert(res instanceof Error))
        .catch(err => assert(err.message === 'Group not found'));
    });
  });
});
