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
  promise = promise.then(() => app.service(name).remove(null));
});

promise
  .then(() => {
    process.stdout.write('Successfully cleaned database\n');
    process.exit(0);
  })
  .catch(() => {
    process.stdout.write('Failed to clean database\n');
    process.exit(-1);
  });
