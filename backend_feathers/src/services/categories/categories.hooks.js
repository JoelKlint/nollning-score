const { authenticate } = require('@feathersjs/authentication').hooks;
const populateSequelizeModel = require('../../hooks/populateSequelizeModel');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      populateSequelizeModel()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
