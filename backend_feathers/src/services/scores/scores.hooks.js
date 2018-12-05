const { authenticate } = require('@feathersjs/authentication').hooks;
const populateSequelizeModel = require('../../hooks/populateSequelizeModel');
const enableUpsert = require('../../hooks/enableUpsert');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      // TODO: Limit so users can only read their own scores
      populateSequelizeModel(),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      enableUpsert()
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
