const express = require('express');
const router = express.Router();

const inputData = require('../../models/inputData');
router.get('/:id', (req, res) => {
  const { id } = req.params;
  inputData.find({ formID: id }).then(inputs => res.json(inputs));
});
router.post('/', (req, res) => {
  const newinputData = new inputData({
    formID: req.body.formID,
    formName: req.body.formName,
    names: req.body.names,
    values: req.body.values
  });

  newinputData
    .save()
    .then(() => res.json(`The inputs were submitted successfully`))
    .catch(err => console.log('new input error:  ', err));
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  inputData.deleteMany({ formID: id }, err => {
    console.log(err);
  });
});
module.exports = router;
