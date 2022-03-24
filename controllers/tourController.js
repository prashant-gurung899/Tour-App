const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

//ROUTE HANDLERS
//for tours
//GET method logic
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,difficulty,summary,ratingsAverage';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // //BUILD QUERY
    // //1A-FILTERING-destructuring
    // const queryObj = { ...req.query }; //copy object
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((el) => delete queryObj[el]);

    // // console.log(req.query, queryObj);

    // //FILTERING-BY HARD CODING

    // // const tours = await Tour.find({
    // //   duration : 5,
    // //   difficulty:'easy'
    // // });

    // //NOT APPLICABLE TO CHAIN METHOD IN FUTURE
    // //const tours = await Tour.find(req.query);
    // // const tours = await Tour.find(queryObj);

    // //1BADVANCED FILTERING
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // //console.log(JSON.parse(queryStr));

    // // const query = Tour.find(queryObj); //EASIER FOR CHAINING METHODS IN FUTURE
    // let query = Tour.find(JSON.parse(queryStr)); //EASIER FOR CHAINING METHODS IN FUTURE

    // //2SORTING
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   // console.log(sortBy);
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort('-createdAt'); //default sort option-descending
    // }

    // //3- FIELD LIMITNG
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');

    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v'); //default limitation-exclude
    // }
    // //4-PAGINATION
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('This page does not exist');
    // }

    //EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      //different stages of pipeline - ARRAY
      //STAGE-1
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      //STAGE-2
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          // _id:'$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },

          avgRatings: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      //STAGE-3
      {
        $sort: {
          avgPrice: 1, //ascending
        },
      },
      //you can also repeat stages
      //STAGE-4
      // {
      //   $match: {
      //     _id: { $ne: 'EASY' }, //id is difficulty in the grouping stage
      //   },
      // },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        tour: stats,
      },
    });
  } catch {
    res.status(400).json({
      status: 'failed',
      message: 'ERROR',
    });
  }
};
