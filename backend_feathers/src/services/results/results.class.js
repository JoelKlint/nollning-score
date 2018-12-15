const {
  groupBy,
  uniq,
} = require('lodash');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  // async find (params) {
  //   return [];
  // }

  /**
   * Returns the current results for this event
   * {
   *    id: same_as_event_id
   *    results: {
   *      guild_id_1: result_1,
   *      guild_id_2: result_2
   *    }
   * }
   */
  async get (id, params) {
    const categories = await this.app.service('categories').find({
      query: {
        eventId: id
      }
    });
    const categoriesById = groupBy(categories, cat => cat.id);
    const categoryTypes = uniq(categories.map(c => c.type));

    const scores = await this.app.service('scores').find({
      query: {
        categoryId: {
          $in: categories.map(c => c.id)
        }
      }
    });
    const scoresByGuild = groupBy(scores, score => score.guildId);

    const guilds = await this.app.service('guilds').find();

    const defaultResult = guilds.reduce((acc, guild) => {
      acc[guild.id] = 0;
      return acc;
    }, {});

    const results = guilds.reduce((result, guild) => {
      const guildScores = scoresByGuild[guild.id];
      if(guildScores) {
        result[guild.id] = guildScores.reduce((acc, score) => {
          const category = categoriesById[score.categoryId][0];
          switch (category.type) {
          case 'interval': {
            const value = score.value;
            const weight = category.weight;
            return acc + value * weight;
          }
          case 'interger':
            break;
          case 'boolean':
            break;
          default:

            break;
          }
        }, 0);
      }
      return result;
    }, defaultResult);

    return {
      id: Number(id),
      results: results,
    };

  }

  // async create (data, params) {
  //   if (Array.isArray(data)) {
  //     return Promise.all(data.map(current => this.create(current, params)));
  //   }

  //   return data;
  // }

  // async update (id, data, params) {
  //   return data;
  // }

  // async patch (id, data, params) {
  //   return data;
  // }

  // async remove (id, params) {
  //   return { id };
  // }

  setup(app) {
    this.app = app;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
