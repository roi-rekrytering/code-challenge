const { assert } = require('chai');
const sinon = require('sinon');
const input = require('./../input');
const NameCollection = require('./../models/namemap');
const Relation = require('./../models/relation');
const controllerLib = require('./../controller');
const strings = require('./../strings');

let users;
let companies;
let relations;
let controller;

const USER = 'foobaz';
const COMPANY = 'foobar';

describe('Controller', function () {
  let getInputStub;
  let spy;
  beforeEach(function () {
    spy = sinon.spy(console, 'log');
    getInputStub = sinon.stub(input, 'getInput');
    users = new NameCollection();
    companies = new NameCollection();
    relations = new Relation();
    controller = controllerLib(users, companies, relations);
  });

  afterEach(function () {
    getInputStub.restore();
    spy.restore();
  });

  it('Should be running as default', function () {
    assert.equal(controller.isRunning(), true);
  });

  it('Should set running to false when doExit', function () {
    controller.doExit();
    assert.equal(controller.isRunning(), false);
  });

  it('Should add a user', function () {
    getInputStub.returns(USER);
    assert.isTrue(controller.addUser());
    assert.isTrue(users.has(USER));
  });

  it('Should add a company', function () {
    getInputStub.returns(COMPANY);
    assert.isTrue(controller.addCompany());
    assert.isTrue(companies.has(COMPANY));
  });

  describe('Attach Users to Company', function () {
    it('Should attach a user to a company', function () {
      getInputStub.onCall(0).returns(USER);
      getInputStub.onCall(1).returns(COMPANY);
      getInputStub.onCall(2).returns(COMPANY);
      getInputStub.onCall(3).returns(USER);

      assert.isTrue(controller.addUser());
      assert.isTrue(controller.addCompany());
      
      const ret = controller.attachUserToCompany();
      assert.notEmpty(relations.get());
      assert.lengthOf(relations.get(), 1);
    });

    it('Should return if not found company', function () {
      getInputStub.onCall(0).returns(USER);
      getInputStub.onCall(1).returns(COMPANY);
      getInputStub.onCall(2).returns(COMPANY + 'Not found');
      getInputStub.onCall(3).returns('');

      assert.isTrue(controller.addUser());
      assert.isTrue(controller.addCompany());
      
      const ret = controller.attachUserToCompany();
      assert.isEmpty(relations.get());
    });

    it('Should return if not found user', function () {
      getInputStub.onCall(0).returns(USER);
      getInputStub.onCall(1).returns(COMPANY);
      getInputStub.onCall(2).returns(COMPANY);
      getInputStub.onCall(3).returns(USER + 'Not found');
      getInputStub.onCall(4).returns('');

      assert.isTrue(controller.addUser());
      assert.isTrue(controller.addCompany());
      
      const ret = controller.attachUserToCompany();
      assert.isEmpty(relations.get());
    });
  });

  it('Should list users', function () {
    getInputStub.onCall(0).returns(USER);
    assert.isTrue(controller.addUser());
    controller.listUsers();

    assert(spy.calledWith(`1 \t ${USER}`));
  });

  it('Should list companies', function () {
    getInputStub.onCall(0).returns(COMPANY);
    assert.isTrue(controller.addCompany());

    controller.listCompanies();

    assert(spy.calledWith(`1 \t ${COMPANY}`));
  });

  it('Should list relations', function () {

    getInputStub.onCall(0).returns(USER);
    getInputStub.onCall(1).returns(COMPANY);
    getInputStub.onCall(2).returns(COMPANY);
    getInputStub.onCall(3).returns(USER);

    assert.isTrue(controller.addUser());
    assert.isTrue(controller.addCompany());
    
    controller.attachUserToCompany();
    controller.listRelations();
    assert.equal(spy.getCall(0).args[0], COMPANY);
    assert.equal(spy.getCall(1).args[0], strings.LIST_RELATIONS_USERS);
    assert.equal(spy.getCall(2).args[0], `\t${USER}`);
  });
});
