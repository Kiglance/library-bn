/* eslint-disable no-plusplus */
function generateIDS(pre, length) {
  let randomNumbers = '';

  for (let i = 0; i < length; i++) {
    randomNumbers += Math.ceil(Math.random() * 9);
  }

  return `${pre}${randomNumbers}`;
}

module.exports = { generateIDS };
