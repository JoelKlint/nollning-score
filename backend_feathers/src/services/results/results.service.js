// Initializes the `results` service on path `/results`
const createService = require('./results.class.js');
const hooks = require('./results.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/results', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('results');

  service.hooks(hooks);
};
