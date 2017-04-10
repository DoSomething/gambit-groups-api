'use strict';

const should = require('should');
require('dotenv').config();
const mobilecommons = require('../lib/mobilecommons');
const helper = require('./helpers/test-helper');

describe('/lib/mobilecommons', () => {
  describe('#getGroup', () => {
    it('should parse XML and return an object when group_name found', () => {
      const groupName = `random group for campaign_id=${((Math.random() * 200) + 1)}`;
      const group = helper.getGroup(groupName);
      helper.nockGetGroupSuccess(group);

      return mobilecommons
        .getGroup(group.name)
        .then(response => response.should.match(group));
    });
    it('should throw an error when group_name not found', () => {
      const groupName = 'pupp3th sl0th 4evr';
      helper.nockGetGroupNotFound(groupName);

      should.throws(mobilecommons.getGroup(groupName));
    });
  });

  describe('#postGroup', () => {
    it('should parse XML and return an object for new group with group_name', () => {
      const groupName = `new group for campaign_id=${((Math.random() * 200) + 1)}`;
      helper.nockPostGroupSuccess(groupName);

      return mobilecommons
        .postGroup(groupName)
        .then((response) => {
          response.should.have.property('name', groupName);
          response.should.have.property('status', 'active');
          response.should.have.property('size', 0);
          response.id.should.be.type('number');
        });
    });
    it('should throw an error if group_name is invalid', () => {
      const groupName = 'pupp3th sl0th 4evr';
      helper.nockPostGroupError();

      should.throws(mobilecommons.postGroup(groupName));
    });
  });
});
