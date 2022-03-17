const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });
//console.log(app.get('env'));
//console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//database connection logic
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    //connect function returns a promise
    //console.log(con.connections);
    console.log('Connection established');
  });

//SERVER LOGIC
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}...`);
});
