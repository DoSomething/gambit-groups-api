require('dotenv').config();

const assert = require('assert');
const mc = require('../lib/mobilecommons');

describe('mobile commons request', function () {
  it ('should make a group & properly convert xml response to json', function () {
    const name = `delete me test#${Math.random() * 100}`;
    return mc.createGroup(name).then(function(res) {
      assert(typeof res === 'object');
      assert(res.response.group[0]['$'].id !== undefined);
    });
  });
});
