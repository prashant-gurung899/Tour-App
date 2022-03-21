const Tour = require('./../models/tourModel');

//ROUTE HANDLERS
//for tours
//GET method logic
exports.getAllTours = async (req, res) => {
  try {
    //BUILD QUERY
    //FILTERING-destructuring
    const queryObj = { ...req.query }; //copy object
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // console.log(req.query, queryObj);

    //FILTERING-BY HARD CODING

    // const tours = await Tour.find({
    //   duration : 5,
    //   difficulty:'easy'
    // });

    //NOT APPLICABLE TO CHAIN METHOD IN FUTURE
    //const tours = await Tour.find(req.query);
    // const tours = await Tour.find(queryObj);

    //ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    // const query = Tour.find(queryObj); //EASIER FOR CHAINING METHODS IN FUTURE
    const query = Tour.find(JSON.parse(queryStr)); //EASIER FOR CHAINING METHODS IN FUTURE

    //EXECUTE QUERY
    const tours = await query;

    //FILTER USING mongoose METHODS-chaining
    // const query = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    res.status(200).json({
      status: 'Success',
      //for multiple objects
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Bad',
      message: err,
    });
  }
};

//get tour by id
exports.getOneTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id:req.params.id})
    res.status(200).json({
      status: 'Success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Bad',
      message: err,
    });
  }
};

//post method logic
exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

//patch method logic
exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid data sent!',
    });
  }
};

//delete method logic
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'Tour Deleted',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'ERROR',
    });
  }
};
