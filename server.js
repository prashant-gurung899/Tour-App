const app = require('./app');
//SERVER LOGIC
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}...`);
});
