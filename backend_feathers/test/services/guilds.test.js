const app = require('../../src/app');

describe('\'guilds\' service', () => {
  it('registered the service', () => {
    const service = app.service('guilds');
    expect(service).toBeTruthy();
  });
});
