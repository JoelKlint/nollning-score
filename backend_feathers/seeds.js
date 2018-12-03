const app = require('./src/app');

app.service('users').create({
  email: 'test@test.test',
  password: 'test'
}).catch(err => {
  console.error(err);
});

process.exit(0);
