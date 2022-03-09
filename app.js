const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json()); //middleware-function that modifies the incoming request data.

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
app.get('/api/v1/tours/:id', (req, res) => {
  //variables in the url are called params
  // console.log(req.params);

  //this is a trick to convert a string to a number in javascript
  const id = req.params.id * 1;

  //for request errors
  if (id > tours.length) {
    return res.status(404).json({
      status: 'FAILURE',
      message: 'INVALID ID',
    });
  }

  //finding the tour through find function loop
  const tour = tours.find((el) => el.id === id);

  //for request errors example 2
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'FAILURE',
  //     message: 'INVALID ID',
  //   });
  // }
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
});
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  //new id assignment
  const newId = tours[tours.length - 1].id + 1;

  //create new object by merging with existing objects = Object.assign()
  const newTour = Object.assign({ id: newId }, req.body);

  //push new object(tour) into tours-simple.JSON
  tours.push(newTour);

  //write into the file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  // res.send('DONE'); cant send res twice
});
app.listen(port, () => {
  console.log(`listening on port: ${port}...`);
});
