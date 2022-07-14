/** Guideline
 ** Create prototype if you need to add data or message in response. Else create object
 ** Start with capital letter in case of prototype and small in case of object
 */
'use strict';

function GenericSuccessMessage() {
  this.code = 200;
  this.status = 'success';
}

function GenericFailureMessage() {
  this.code = 400;
  this.status = 'failure';
}

function ErrorInQueryingDB() {
  this.code = 500;
  this.status = 'failure';
  this.message = 'Please try again after some time';
}

function ObjectDoesNotExistInDB() {
  this.code = 200;
  this.status = 'not_found';
  this.message = 'The queried object does not exist';
}

function UpdateBadRequest() {
  this.code = 400;
  this.status = 'failure';
  this.message = 'Update failed';
}

function AuthenticationFailure() {
  this.code = 401;
  this.status = 'failure';
  this.message = 'Authentication failed.';
}

function AuthenticationSuccess() {
  this.code = 200;
  this.status = 'success';
  this.message = 'Authentication successful.';
}

function invalidMongooseId(mongooseId) {
  this.code = 400;
  this.status = 'failure';
  this.message = `${mongooseId} is an invalid mongodb objectId.`;
}

module.exports = {
  // These are prototypes
  GenericSuccessMessage: GenericSuccessMessage,

  GenericFailureMessage: GenericFailureMessage,

  ErrorInQueryingDB: ErrorInQueryingDB,

  ObjectDoesNotExistInDB: ObjectDoesNotExistInDB,

  UpdateBadRequest: UpdateBadRequest,

  AuthenticationFailure: AuthenticationFailure,

  AuthenticationSuccess: AuthenticationSuccess,

  invalidMongooseId: invalidMongooseId,

  tokenNotProvided: {
    code: 403,
    status: 'failure',
    message: 'Access denied. Token not provided for authentication',
  },

  tokenAuthenticationFailed: {
    code: 403,
    status: 'failure',
    message:
      'Access denied. Failed to authenticate token. Please login once again',
  },

  tokenAuthenticationPassed: {
    code: 200,
    status: 'success',
    message: 'Access allowed. Token successfully authenticated',
  },

  tokenVerificationPassed: {
    code: 200,
    status: 'success',
    message: 'token verified',
  },

  tokenVerificationFailed: {
    code: 400,
    status: 'failure',
    message: 'token is invalid or has expired',
  },

  accessDenied: {
    code: 403,
    status: 'failure',
    message: 'Access denied. Operation not permitted',
  },

  incorrectPayload: {
    code: 400,
    status: 'failure',
    message:
      "Payload is not correct. It's missing one or more of the required information.",
  },

  invalidUserName: {
    code: 400,
    status: 'failure',
    message:
      'username incorrect. Enter your registered mobile number/registered email',
  },

  invalidEmail: {
    code: 400,
    status: 'failure',
    message: 'email incorrect. Enter your registered email',
  },

  operationProhibited: {
    code: 400,
    status: 'failure',
    message: 'You are prohibited to perform the given operation',
  },

  missingOrBadAuthentication: {
    code: 401,
    status: 'failure',
    message: 'Missing or bad authentication',
  },

  userNotAuthorized: {
    code: 401,
    status: 'failure',
    message: 'User not authorized to perform this operation',
  },

  firebaseTokenNotFound: {
    code: 400,
    status: 'failure',
    message: 'firebase token not found',
  },

  userPropertyNotFound: {
    code: 400,
    status: 'failure',
    message: 'user property not found',
  },

  mobileNumberNotFound: {
    code: 400,
    status: 'failure',
    message: 'mobile number not found',
  },

  urlNotFound: {
    code: 404,
    status: 'failure',
    message: 'Incorrect URL',
  },

  userFilledForm: {
    code: 404,
    status: 'failure',
    message: 'User has already Filled Form',
  },

  userNotFilledForm: {
    code: 404,
    status: 'failure',
    message: 'User Not Filled Form',
  },

  activityExpired: {
    code: 404,
    status: 'failure',
    message: 'Application Expired',
  },

  badRequestParam: {
    code: 404,
    status: 'failure',
    message: 'Invalid Paramter!',
  },

  fileUploadFailed: {
    code: 500,
    status: 'failure',
    message: 'something went wrong. file upload failed',
  },
};
