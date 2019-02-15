const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Input = require('./routes/api/inputsAPI');
const inputData = require('./routes/api/inputDataAPI');
const app = express();

//bodyParser middleware

app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongo
mongoose
  .connect(db)
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

//when making HTTP request for items, it sends it to the Items file
app.use('/api/inputs', Input);
app.use('/api/inputData', inputData);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
