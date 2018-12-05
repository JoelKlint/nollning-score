const app = require('./src/app');
const iteration_one = [];
const iteration_two = [];

/**
 * Implement seeders here
 */
iteration_one.push(app.service('users').create([
  { id: 1, email: 'test', password: 'test' }
]));

iteration_one.push(app.service('events').create([
  { id: 1, name: 'FlyING' },
]));

iteration_one.push(app.service('guilds').create([
  { id: 1, name: 'F', color: '#f8941e' },
  { id: 2, name: 'E', color: '#ffffff' },
  { id: 3, name: 'M', color: '#ed2024' },
  { id: 4, name: 'V', color: '#3952a4' },
  { id: 5, name: 'A', color: '#91258f' },
  { id: 6, name: 'K', color: '#ffff00' },
  { id: 7, name: 'D', color: '#f280a1' },
  { id: 8, name: 'ING', color: '#2b318b'},
  { id: 9, name: 'W', color: '#6fccdd' },
  { id: 10, name: 'I', color: '#971b1e' },
]));

iteration_two.push(app.service('categories').create([
  {
    id: 1,
    weight: 1,
    type: 'interval',
    selected_guild: null,
    name: 'Farkostens utformning',
    interval_min: 0,
    interval_max: 5,
    global: false,
    eventId: 1,
    absolute: false
  }
]));

app.setup();
Promise.all(iteration_one)
  .then(iteration_two)
  .then(() => process.exit(0))
  .catch(() => process.exit(-1));
