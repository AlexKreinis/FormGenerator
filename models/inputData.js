const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inputDataSchema = new Schema({
  formName: {
    type: String,
    required: true
  },
  names: [{ type: String, required: true }],
  values: [{ type: String, required: true }],
  formID: {
    type: String,
    required: true
  }
});
module.exports = inputData = mongoose.model('inputData', inputDataSchema);
