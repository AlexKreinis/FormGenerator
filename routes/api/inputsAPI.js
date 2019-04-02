const express = require('express');
const router = express.Router();
const buildInputItem = require('./moduleCreator/buildInputItem');
const Input = require('../../models/Input');

router.get('/', async (req, res) => {
  try {
    let inputs = await Input.find();
    res.json(inputs);
  } catch (err) {
    console.log(err);
  }
});
router.get('/:id', async ({ params }, res) => {
  try {
    let input = await Input.findById(params.id);
    res.json(input);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async ({ body }, res) => {
  const newInput = buildInputItem(body);
  try {
    await newInput.save();
    res.json('The inputs were submitted successfully');
  } catch (err) {
    console.log(err);
    res.status(404).send("The inputs wasn't created");
  }
});

router.delete('/:id', async ({ params }, res) => {
  try {
    const input = await Input.findById(params.id);
    await input.remove();
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

router.post('/submissionUpdate/:id', async ({ params }, res) => {
  try {
    await Input.findByIdAndUpdate(
      params.id,
      { $inc: { submits: 1 } },
      { new: true }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

module.exports = router;
