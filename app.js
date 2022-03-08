const fs = require('fs');
const express = require('express');

const app = express();

const port = 3000;

/*app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from the server side', app: 'NATOURS APP' });
  //res.send('hello, world!');
});
app.post('/', (req, res) => {
  res.send('Hello,you can post here...................');
});*/

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    //jsend json formatting standard
    status: 'Success',
    //for multiple objects
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});
app.listen(port, () => {
  console.log(`listening on port: ${port}...`);
});
