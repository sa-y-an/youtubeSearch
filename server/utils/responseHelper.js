'use strict';

const errorMsg = {
  code: 500,
  status: 'failure',
  message: 'something went wrong',
};

module.exports = (err, res, data, statusCode) => {
  let responseType;
  try {
    responseType = statusCode.toString()[0];
  } catch (e) {
    responseType = 2;
  }

  if (err) {
    return res
      .set({ 'content-type': 'application/json' })
      .status(500)
      .send(err);
  } else {
    if (responseType !== 5) {
      let body = data;
      if (typeof data === 'string') {
        try {
          body = JSON.parse(data);
        } catch (e) {
          return res.status(statusCode).send(data);
        }
      }
      return res
        .set({ 'content-type': 'application/json' })
        .status(statusCode)
        .send(body);
    } else {
      return res
        .set({ 'content-type': 'application/json' })
        .status(500)
        .send(errorMsg);
    }
  }
};
