const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json()); //middleware-function that modifies the incoming request data.

//global middleware
app.use((req, res, next) => {
  console.log('HELLO FROM THE MIDDLEWARE');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

//FILE READ
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//ROUTE HANDLERS
//for tours
//GET method logic
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    //jsend json formatting standard
    status: 'Success',
    requestedAt: req.requestTime,
    //for multiple objects
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
//get tour by id
const getOneTour = (req, res) => {
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
};

//post method logic
const createTour = (req, res) => {
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
};

//patch method logic
const updateTour = (req, res) => {
  //for request errors
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'FAILURE',
      message: 'INVALID ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here.....>',
    },
  });
};

//delete method logic
const deleteTour = (req, res) => {
  //for request errors
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'FAILURE',
      message: 'INVALID ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//for users
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'ERROR',
    message: 'This route is not implemented yet',
  });
};
const getOneUser = (req, res) => {
  res.status(500).json({
    status: 'ERROR',
    message: 'This route is not implemented yet',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'ERROR',
    message: 'This route is not implemented yet',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'ERROR',
    message: 'This route is not implemented yet',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'ERROR',
    message: 'This route is not implemented yet',
  });
};

// app.get('/api/v1/tours', getTours);
// app.get('/api/v1/tours/:id', getOneTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//ROUTES
//chaining all the route handlers rather than calling everyone each at a time
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getOneTour)
  .patch(updateTour)
  .delete(deleteTour);

//user ROUTES
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getOneUser)
  .patch(updateUser)
  .delete(deleteUser);

//SERVER LOGIC
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}...`);
});
