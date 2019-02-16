const express = require('express');
const router = express.Router();

//item Model
//getting the Item from models(schema)

const Input = require('../../models/Input');

router.get('/', (req, res) => {
  Input.find().then(inputs => res.json(inputs));
});
router.get('/:id', (req, res) => {
  Input.findById(req.params.id).then(Input => res.json(Input));
});

router.post('/', (req, res) => {
  const newInput = new Input({
    inputs: req.body.inputs,
    formName: req.body.formName
  });

  newInput
    .save()
    .then(() => res.json(`The inputs were submitted successfully`))
    .catch(err => {
      console.log(err);
      res.status(404).send("The inputs wasn't created");
    });
});
router.delete('/:id', (req, res) => {
  Input.findById(req.params.id)
    .then(Input => Input.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

router.post('/submissionUpdate/:id', (req, res) => {
  const { id } = req.params;
  Input.findByIdAndUpdate(
    id,
    { $inc: { submits: 1 } },
    { new: true },
    (err, updateRes) => {
      if (err) return next(err);
      return res.json({ sucess: true });
    }
  );
});

module.exports = router;
