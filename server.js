const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

// SET ENV CONFIG PATH
dotenv.config({ path: './config.env' });

const app = require('./app');

// CONNECT MONGODB
(async function () {
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  const con = await mongoose.connect(DB);
  console.log(`mongoDB connected on: ${con.connection.host}`);
})();

// START SERVER
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server running...`);
});

process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
