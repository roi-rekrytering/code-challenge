const { assert } = require('chai');
const input = require('./../input');
const sinon = require('sinon');
const utils = require('./../utils');
const strings = require('./../strings');

const INPUT = 'foobar';
const OUTPUT = 'foobaz';
let calledOnce = false;

const controller = {
  fake: () => {
    calledOnce = true;
  },
};
const options = [
  {
    text: INPUT,
    exec: controller.fake,
  },
];

describe('Utils', function () {
  let spy;
  let getInputStub;
  beforeEach(function () {
    calledOnce = false; 
    spy = sinon.spy(console, 'log');
    getInputStub = sinon.stub(input, 'getInput');
  });

  afterEach(function () {
    spy.restore();
    getInputStub.restore();
  });

  it('Should printMenu', function () {
    const options = [
      {
        text: INPUT,
      },
    ];
    utils.printMenu(options);
    assert.equal(spy.callCount, 2);
    assert.equal(spy.getCall(0).args[0], strings.MENU_TITLE);
    assert.equal(spy.getCall(1).args[0], `\t1) ${INPUT}`);
  });
  describe('getMenuInput', function () {
    const faultyInput = ['foo', 0, 10];
    faultyInput.forEach(function (input) {
      it(`Should do noting on faulty values ${input}`, function () {
        getInputStub.onCall(0).returns('foo');
        utils.getMenuInput(controller, options);
        assert.isFalse(calledOnce);
      });
    });
    it('Should execute menu option', function () {
      getInputStub.onCall(0).returns('1');
      utils.getMenuInput(controller, options);
      assert.isTrue(calledOnce);
    });
  });
});
