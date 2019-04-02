const express = require('express');
const router = express.Router();
const inputData = require('../../models/inputData');
const builldInputDataItem = require('./moduleCreator/buildinputDataItem');

router.get('/:id', async ({ params }, res) => {
  try {
    let inputs = await inputData.find({ formID: params.id });
    res.json(inputs);
  } catch (err) {
    console.log(err);
  }
});
router.post('/', async ({ body }, res) => {
  try {
    const newinputData = builldInputDataItem(body);
    await newinputData.save();
    res.json(`The inputs were submitted successfully`);
  } catch (err) {
    console.log(error);
  }
});
router.delete('/:id', async ({ params }, res) => {
  try {
    await inputData.deleteMany({ formID: params.id });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
