'use strict'

const environment = process.env.NODE_ENV;
let mongoMainHost, mongoMainDB, mongoMainUser, mongoMainPass, gmail, gmailPass, gmailPort, gmailHost;

if (environment === 'production') {

    gmail = process.env.GMAIL_PROD;
    gmailPass = process.env.GMAIL_PASSWORD_PROD;

} else if (environment === 'development') {

    mongoMainHost = process.env.DEV_MONGO_MAIN_HOST;
    mongoMainDB = process.env.DEV_MONGO_MAIN_DB;
    mongoMainUser = process.env.DEV_MONGO_USERNAME;
    mongoMainPass = process.env.DEV_MONGO_PASSWORD;

    gmail = process.env.GMAIL_DEV
    gmailPass = process.env.GMAIL_PASSWORD_DEV
    gmailPort = process.env.GMAIL_PORT_DEV
    gmailHost = process.env.HOST_DEV

}

global.ENVIRONMENT = environment;

// db variables
global.mongoMainHost = mongoMainHost;
global.mongoMainDB = mongoMainDB;
global.mongoMainUser = mongoMainUser;
global.mongoMainPass = mongoMainPass;

// JWT settings
global.JWT_SECRET = process.env.JWT_SECRET;
global.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
global.JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN;

// Mail variables
global.gmail = gmail;
global.gmailPass = gmailPass;
global.gmailPort = gmailPort;
global.gmailHost = gmailHost;
