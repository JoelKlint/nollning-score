const {
  associateCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');

module.exports = {
  associateCurrentUser: () => associateCurrentUser({ idField: 'id' }),
  restrictToOwner: () => restrictToOwner({ idField: 'id' })
};
