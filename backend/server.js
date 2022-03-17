const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Little Paws API');
});

app.listen(5000, console.log(`Server running on port 5000`));
