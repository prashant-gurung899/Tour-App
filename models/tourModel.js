const mongoose = require('mongoose');
//Schema
const tourSchema = new mongoose.Schema({
  //schema type otions
  name: {
    type: String,
    //validator
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});
//create model from Schema
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
