const users = require('./users/users.service.js');
const guilds = require('./guilds/guilds.service.js');
const events = require('./events/events.service.js');
const categories = require('./categories/categories.service.js');
const scores = require('./scores/scores.service.js');
const me = require('./me/me.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(guilds);
  app.configure(events);
  app.configure(categories);
  app.configure(scores);
  app.configure(me);
};
