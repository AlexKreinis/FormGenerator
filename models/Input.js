const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InputSchema = new Schema({
  formName: {
    type: String,
    required: true
  },
  inputs: [
    {
      fieldLabel: {
        type: String,
        required: true
      },
      inputName: {
        type: String,
        required: true
      },
      inputType: {
        type: String,
        required: true
      }
    }
  ],
  submits: {
    type: Number,
    default: 0
  }
});

module.exports = Input = mongoose.model('input', InputSchema);
