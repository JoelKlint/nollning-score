const app = require('../../src/app');
const { simulateAuthUser } = require('../util');

const validParams = {
  name: 'test name2'
};

describe('\'categories\' service', () => {
  it('registered the service', () => {
    const service = app.service('categories');
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('can only be created by admins', () => {
      app.get('sequelizeClient').sync({force: true});
      // Make authenticated
      const params = simulateAuthUser();

      // Make test
      const service = app.service('categories');
      const category = service.create(validParams, params);
      return expect(category).resolves.toBeTruthy();
    });
  });
});
