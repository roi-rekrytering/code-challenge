const { assert } = require('chai');
const sinon = require('sinon');
const NameCollection = require('./../../models/namemap');
const Relation = require('./../../models/relation');

const users = new NameCollection();
const companies = new NameCollection();
const relation = new Relation();

const COMPANY = 'foobar';
const USER = 'foobaz';
const USER2 = 'foobaz2';

describe('Relation', function () {
  it('should add a user to a company', function () {
    companies.add(COMPANY);
    users.add(USER);
    const companyId = companies.get(COMPANY);
    const userId = users.get(USER);
    relation.add(companyId, userId);
    
    assert.notEmpty(relation.get());
    assert.lengthOf(relation.get(), 1);
  });
  it('should add two users to a company', function () {
    companies.add(COMPANY);
    users.add(USER);
    users.add(USER2);
    const companyId = companies.get(COMPANY);
    const userId = users.get(USER);
    const userId2 = users.get(USER2);
    relation.add(companyId, userId);
    relation.add(companyId, userId2);
    
    assert.notEmpty(relation.get());
    assert.lengthOf(relation.get(), 1);
    console.log(relation.get().get(companyId), 2);
  });
});
