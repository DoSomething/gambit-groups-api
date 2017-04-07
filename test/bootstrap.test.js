'use strict';

/**
 * Imports.
 */
// const helper = require('./helpers/test-helper');
// const nock = require('nock');
// const util = require('../lib/util');
/* eslint-disable max-len */
// /**
//  * Setup.
//  */
// const existingGroupName = helper.getGroupName();
// const existingGroupXml = '<response success="true"><groups>' +
//                           `  <group id="${helper.getExistingGroupId()}" type="UploadedGroup" status="active">` +
//                           `    <name>${existingGroupName}</name>` +
//                           '    <size>0</size>' +
//                           '  </group>' +
//                           '</groups></response>';
/* eslint-enable max-len */

/**
 * Run tests.
 */
require('./lib/api.test');
require('./lib/mobilecommons.test');
require('./lib/util.test');
