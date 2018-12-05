// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const categories = sequelizeClient.define('categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.ENUM(
        'interval',
        'integer',
        'boolean',
        'guild'
      )
    },
    absolute: {
      type: DataTypes.BOOLEAN
    },
    global: {
      type: DataTypes.BOOLEAN
    },
    weight: {
      type: DataTypes.INTEGER
    },
    interval_min: {
      type: DataTypes.INTEGER
    },
    interval_max: {
      type: DataTypes.INTEGER
    }

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  categories.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    categories.belongsTo(models.events);
    categories.hasMany(models.scores);
    categories.belongsTo(models.guilds, { as: 'selected_guild' });
  };

  return categories;
};
