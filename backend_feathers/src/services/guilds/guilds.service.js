// Initializes the `guilds` service on path `/guilds`
const createService = require('feathers-sequelize');
const createModel = require('../../models/guilds.model');
const hooks = require('./guilds.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/guilds', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('guilds');

  service.hooks(hooks);
};
