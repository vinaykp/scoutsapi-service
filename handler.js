'use strict';
const connectToDatabase = require('./db');
const Member = require('./models/Member');

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Scoutsapi Serverless function executed successfully!',
      input: event,
    }),
  };
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Member.find()
        .then(members => callback(null, {
          isBase64Encoded: false,
          statusCode: 200,
          body: JSON.stringify(members)
        }))
        .catch(err => callback(null, {
          isBase64Encoded: false,
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: {
            message: 'Could not fetch the members.'
          }
        }))
    });
};
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Member.create(JSON.parse(event.body))
        .then(member => callback(null, {
          statusCode: 200,
          body: JSON.stringify(member)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the member.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Member.findById(event.pathParameters.id)
        .then(member => callback(null, {
          statusCode: 200,
          body: JSON.stringify(member)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the member.'
        }));
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Member.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(member => callback(null, {
          statusCode: 200,
          body: JSON.stringify(member)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the members.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Member.findByIdAndRemove(event.pathParameters.id)
        .then(member => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed member with id: ' + member._id, member: member })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the members.'
        }));
    });
};

