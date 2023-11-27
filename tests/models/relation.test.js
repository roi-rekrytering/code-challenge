const { assert } = require('chai');
const sinon = require('sinon');
const NameCollection = require('./../../models/namemap');
const Relation = require('./../../models/relation');

let relation;

const COMPANY_ID = 1;
const COMPANY_2_ID = 5;
const USER_ID = 2;
const USER_2_ID = 3;

describe('Relation', function () {
  beforeEach(function () {
    relation = new Relation();
  });
  it('Should add a user to a company', function () {
    relation.add(COMPANY_ID, USER_ID);
    
    assert.notEmpty(relation.get());
    assert.lengthOf(relation.get(), 1);
    assert.lengthOf(relation.get().get(COMPANY_ID), 1);
  });
  it('should add two users to a company', function () {
    relation.add(COMPANY_ID, USER_ID);
    relation.add(COMPANY_ID, USER_2_ID);
    
    assert.notEmpty(relation.get());
    assert.lengthOf(relation.get(), 1);
  });
  it('Should add two users to two different companies', function () {
    relation.add(COMPANY_ID, USER_ID);
    relation.add(COMPANY_2_ID, USER_2_ID);

    assert.notEmpty(relation.get());
    assert.lengthOf(relation.get(), 2);
  });
});
