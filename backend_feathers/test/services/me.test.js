const app = require('../../src/app');

describe('\'me\' service', () => {
  it('registered the service', () => {
    const service = app.service('me');
    expect(service).toBeTruthy();
  });
});
