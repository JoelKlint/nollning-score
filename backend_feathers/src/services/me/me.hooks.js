const { authenticate } = require('@feathersjs/authentication').hooks;
const { protect } = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: context => {
      context.result = context.params.user;
    },
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      // Never send password to client
      protect('password')
    ],
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
