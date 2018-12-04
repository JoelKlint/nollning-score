const app = require('./src/app');

const seed = () => new Promise((resolve, reject) => {
  Promise.resolve()
    .then(() => app.service('users').create({
      email: 'test@test.test',
      password: 'test'
    }))
    .then(() => app.service('events').create([
      { name: 'FlyING' },
      { name: 'Lådbilsrally' },
      { name: 'Överphöshinderbana' },
      { name: 'Regatta' },
    ]))
    .then(() => app.service('guilds').create([
      { name: 'F', color: '#f8941e' },
      { name: 'E', color: '#ffffff' },
      { name: 'M', color: '#ed2024' },
      { name: 'V', color: '#3952a4' },
      { name: 'A', color: '#91258f' },
      { name: 'K', color: '#ffff00' },
      { name: 'D', color: '#f280a1' },
      { name: 'ING', color: '#2b318b' },
      { name: 'W', color: '#6fccdd' },
      { name: 'I', color: '#971b1e' },
    ]))
    .then(resolve).catch(reject);
});

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(-1));







