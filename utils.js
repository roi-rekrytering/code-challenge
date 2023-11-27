const strings = require('./strings');
const input = require('./input');

/**
 * Prints text and waits for the user to enter a name and searches the given collection,
 * returns the id of the entered name in the collection. -1 if not found.
 *
 * @param NameMap collection
 * @param string text
 * @return int
 */
const getNameId = (collection, text) => {
  let id = -1;
  while (true) {
    const name = input.getInput(`Enter ${text}:`);
    if (name.length && collection.has(name)) {
      return collection.get(name);
    }
    if (name.length === 0) {
      return -1;
    }
    console.log(`${text} not found.`);
  }
}

/**
 * @param object[] options
 * @param string option.test
 * @param fucntion option.exec
 */
const printMenu = (options) => {
  console.log(strings.MENU_TITLE);
  options.forEach(function (option, index) {
    console.log(`\t${index+1}) ${option.text}`);
  }); 
}

/**
 * Waits for the user to enter a menu option.
 * If menu option valid, it executes that option otherwise returns.
 *
 * @param Controller controller
 * @param object() options
 */
const getMenuInput = (controller, options) => {
  const optionValue = parseInt(input.getInput(), 10);
  if (Number.isNaN(optionValue) || optionValue < 1 || optionValue > options.length) {
    return;
  }
  options[optionValue - 1].exec.call(controller);
}

module.exports = {
  getNameId,
  getMenuInput,
  printMenu,
};
