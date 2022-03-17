const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  // const name = req.body.name;
  //const price = req.body.price;
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'FAILURE',
      message: 'MISSING NAME OR PRICE',
    });
  }
  next();
};
//ROUTE HANDLERS
//for tours
//GET method logic
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    //jsend json formatting standard
    status: 'Success',
    requestedAt: req.requestTime,
    // //for multiple objects
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};
//get tour by id
exports.getOneTour = (req, res) => {
  //this is a trick to convert a string to a number in javascript
  const id = req.params.id * 1;

  //finding the tour through find function loop
  //const tour = tours.find((el) => el.id === id);
};

//post method logic
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    //  data: {
    //    tour: newTour,
    //  },
  });
};

//patch method logic
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here.....>',
    },
  });
};

//delete method logic
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
