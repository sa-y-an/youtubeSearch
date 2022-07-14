'use strict';

function getMongoDatabaseUrls() {
    let mongoMainUrl;

    ENVIRONMENT = process.env.NODE_ENV;

    if (ENVIRONMENT === 'production') {
        mongoMainUrl = `mongodb+srv://${mongoMainUser}:${mongoMainPass}@${mongoMainHost}/${mongoMainDB}?retryWrites=true&w=majority`;
    } else if (ENVIRONMENT === 'development') {
        mongoMainUrl = `mongodb+srv://${mongoMainUser}:${mongoMainPass}@${mongoMainHost}/${mongoMainDB}?retryWrites=true&w=majority`;
    }
    return { mongoMainUrl };
}

let { mongoMainUrl } = getMongoDatabaseUrls();

module.exports = {
    mongoMainUrl: mongoMainUrl
};