const Input = require('../../../models/Input');

const buildInputItem = body => {
  const newInput = new Input({
    inputs: body.inputs,
    formName: body.formName
  });
  return newInput;
};

module.exports = buildInputItem;
