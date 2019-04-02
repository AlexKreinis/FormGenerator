const InputData = require('../../../models/inputData');

const builldInputDataItem = body => {
  const newinputData = new InputData({
    formID: body.formID,
    formName: body.formName,
    names: body.names,
    values: body.values
  });
  return newinputData;
};

module.exports = builldInputDataItem;
