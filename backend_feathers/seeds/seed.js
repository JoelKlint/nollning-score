const app = require('../src/app');
app.setup();

const services = [
  'users',
  'events',
  'guilds',
  'categories',
];

let promise = Promise.resolve();
services.forEach(name => {
  promise = promise.then(() => app.service(name).create(
    require(`./data/${name}.json`), {
      user: {
        role: 'admin'
      }
    }
  ));
});

promise
  .then(() => {
    process.stdout.write('Successfully seeded database\n');
    process.exit(0);
  })
  .catch(() => {
    process.stdout.write('Failed to seed database\n');
    process.exit(-1);
  });
