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
    .then(resolve).catch(reject);
});

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(-1));







