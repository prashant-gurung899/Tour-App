const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); //middleware-function that modifies the incoming request data.

//serve static files
app.use(express.static(`${__dirname}/public`));
//global middleware
app.use((req, res, next) => {
  console.log('HELLO FROM THE MIDDLEWARE');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

// app.get('/api/v1/tours', getTours);
// app.get('/api/v1/tours/:id', getOneTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//mounting routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
