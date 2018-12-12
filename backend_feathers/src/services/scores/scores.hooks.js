const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  associateCurrentUser,
  restrictToOwner
} = require('../../hooks/authHooks');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
    ],
    find: [
      restrictToOwner(),
    ],
    get: [
      restrictToOwner(),
    ],
    create: [
      associateCurrentUser()
    ],
    update: [
      restrictToOwner(),
      associateCurrentUser()
    ],
    patch: [
      restrictToOwner(),
      associateCurrentUser()
    ],
    remove: [
      restrictToOwner(),
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
