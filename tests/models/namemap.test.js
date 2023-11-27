const { assert } = require('chai');
const sinon = require('sinon');
const NameCollection = require('./../../models/namemap');

let testMap;

const TEST_VALUE = 'foobar';
const TEST_VALUE2 = 'foobar2';

describe('NameMap', function () {
  beforeEach(function () {
    testMap = new NameCollection();
  });

  it('should add a value and verify it exists', function () {
    testMap.add(TEST_VALUE);
    const id = testMap.get(TEST_VALUE); 
    assert.equal(id, 1);
  });

  it('should add a value and verify getById', function () {
    testMap.add(TEST_VALUE);
    testMap.add(TEST_VALUE2);
    const id = testMap.get(TEST_VALUE); 
  
    assert.equal(testMap.getById(id), TEST_VALUE);
  });

  it('should list the users', function () {
    let spy = sinon.spy(console, 'log');

    testMap.add(TEST_VALUE);
    testMap.list();

    assert(spy.calledWith(`1 \t ${TEST_VALUE}`));
    spy.restore();
  });
});
