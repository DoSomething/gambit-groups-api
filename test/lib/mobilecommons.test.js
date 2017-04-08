'use strict';

const should = require('should');
require('dotenv').config();
const mobilecommons = require('../../lib/mobilecommons');
const helper = require('../helpers/test-helper');

describe('/lib/mobilecommons', () => {
  describe('#getGroup', () => {
    it('should parse XML and return an object when group_name found', () => {
      const groupName = `random group for campaign_id=${((Math.random() * 200) + 1)}`;
      const group = helper.getExistingGroup(groupName);
      helper.nockGetExistingGroup(group);

      return mobilecommons
        .getGroup(group.name)
        .then(response => response.should.match(group));
    });
    it('should throw an error when group_name not found', () => {
      const groupName = 'pupp3th sl0th 4evr';
      helper.nockGetNotFoundGroup(groupName);

      should.throws(mobilecommons.getGroup(groupName));
    });
  });
});
