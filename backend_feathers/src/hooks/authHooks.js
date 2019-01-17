const {Forbidden} = require('@feathersjs/errors');

const {
  associateCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');

const restrictToAdmin = () => context => {
  const user = context.params.user;
  if (!user || user.role !== 'admin') {
    throw new Forbidden('Only admins can perform this action');
  }
};

module.exports = {
  associateCurrentUser: () => associateCurrentUser({ idField: 'id' }),
  restrictToOwner: () => restrictToOwner({ idField: 'id' }),
  restrictToAdmin: restrictToAdmin,
};
