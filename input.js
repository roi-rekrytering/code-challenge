const prompt = require('prompt-sync')({sigint: true});

/**
 * @param string text
 * @return string
 */
const getInput = (text) => {
  return prompt(text).trim();
}

module.exports = {
  getInput,
};
