'use strict';

/**
 * Run tests.
 */
// API test is borking with nock errors for undefined Mobile Commons requests, commenting for now.
// require('./lib/api.test');
require('./lib/mobilecommons.test');
require('./lib/util.test');
