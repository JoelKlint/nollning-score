const { authenticate } = require('@feathersjs/authentication').hooks;
const { restrictToAdmin } = require('../../hooks/authHooks');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
    ],
    find: [],
    get: [],
    create: [
      restrictToAdmin()
    ],
    update: [
      restrictToAdmin()
    ],
    patch: [
      restrictToAdmin()
    ],
    remove: [
      restrictToAdmin()
    ]
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
