'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const redis = require('redis');
const { promisify } = require('util');
const app = (module.exports = express());

// dont add any config before this line
dotenv.config({ path: './config/.env' });
// Setting global variables, Please don't move this. Please add dependency after this line
require('./config/globalConstant');

const configDB = require('./config/db');

/** Data base connection */
// configuration ===============================================================
//let options = {useNewUrlParser: true, useFindAndModify: false};
mongoose.mainConnection = mongoose.createConnection(configDB.mongoMainUrl);

//------------------------------------------- MAIN DB CONNECTION EVENTS-----------------------------------------------//
// When successfully connected
mongoose.mainConnection.on('connected', async function () {
  console.log('Connected to main MongoDB ');
  mongoose.set('debug', true);
  const searchCronJon = require('./server/search/searchCronJob');
  searchCronJon.start();
});

// If the connection throws an error
mongoose.mainConnection.on('error', function (err) {
  console.error('Mongoose main connection error: ' + JSON.stringify(err));
});

// When the connection is disconnected
mongoose.mainConnection.on('disconnected', function () {
  console.log('Mongoose main connection disconnected');
  const searchCronJon = require('./server/search/searchCronJob');
  searchCronJon.stop();
});

//--------------------------------------PROCESS EVENTS CONNECTION CLOSURES--------------------------------------------//
// If the Node process ends using SIGINT, close both the Mongoose connection
process.on('SIGINT', async function () {
  const searchCronJon = require('./server/search/searchCronJob');
  searchCronJon.stop();
  await redisClient.quit();
  mongoose.mainConnection.close(function () {
    console.log(
      'Mongoose main connection disconnected through app termination'
    );
    process.exit(0);
  });
});

// If the Node process exits using exit, close both the Mongoose connection
process.on('exit', async function () {
  const searchCronJon = require('./server/search/searchCronJob');
  searchCronJon.stop();
  await redisClient.quit();
  mongoose.mainConnection.close(function () {
    console.log(
      'Mongoose main connection disconnected through app termination'
    );
    process.exit(0);
  });
});

/**Redis setup */
const redisClient = redis.createClient({
  socket: {
    port: 6379,
    host: '127.0.0.1',
  },
});

(async () => {
  // Connect to redis server
  await redisClient.connect();
})();

console.log('Attempting to connect to redis');
redisClient.on('connect', () => {
  console.log('Redis Client is Sucessfully Connected!');
});

// Log any error that may occur to the console
redisClient.on('error', (err) => {
  console.log(`REDIS Error ::: ${err}`);
});

global.redisClient = redisClient;
/** Application setup with various global external middlewares */

// body and cookie parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
// app.use(expressValidator());

// Compress all routes and the response.
app.use(compression());

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());
global.applicationRootPath = path.resolve(__dirname);

app.use('/', express.static(path.join(__dirname, 'public')));

// cors policy set to all
app.options('*', cors());
app.use(cors());
app.use(morgan('dev'));

// routes
require('./routes')(app);

// error handling and dev settings

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    return res.json({
      message: err.message,
      error: err,
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  next(err);
});

/** */
