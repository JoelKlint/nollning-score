import { State, Effect, Actions } from 'jumpstate'
import R from 'ramda'
import { schema, normalize } from 'normalizr'

const API_BASE_URL = process.env.REACT_APP_NOLLNING_SCORE_BACKEND_URL || "http://localhost:4000"

export default State({

  initial: {
    entities: {},
    current: {
      event: undefined,
      guild: undefined,
    }
  },

  updateEntities(state, entities) {
    return R.assocPath(
      ['entities'],
      R.mergeDeepRight(state.entities, entities),
      state,
    )
  },

  setCurrentEvent(state, event_id) {
    return R.assocPath(['current', 'event'], Number(event_id), state)
  },


  setCurrentGuild(state, guild_id) {
    return R.assocPath(['current', 'guild'], Number(guild_id), state)
  },

})

/*
*
* Recieves a backend response, and puts in into state in a correct way
*
* Generally follows this thinking:
* - Create schemas for normalize
* - Normalize the response
* - Add entities to state
*
*/
const addApiResponseToState = (res) => {
  let normalized = {}

  let category, event, guild, score, result

  switch(res.type) {

    case "events":
      category = new schema.Entity('categories')
      event = new schema.Entity('events', {
          categories: [category]
      })

      normalized = normalize(res.data, [event])
      break;

    case "event":
      category = new schema.Entity('categories')
      event = new schema.Entity('events', {
          categories: [category]
      })

      normalized = normalize(res.data, event)
      break;

    case "guilds":
      guild = new schema.Entity('guilds')

      normalized = normalize(res.data, [guild])
      break;

    case "category":
      event = new schema.Entity('events')
      guild = new schema.Entity('guild')
      category = new schema.Entity('categories', {
          event: event,
          selected_guild: guild
      })

      normalized = normalize(res.data, category)
      break;

    case "categories":
      event = new schema.Entity('events')
      guild = new schema.Entity('guild')
      category = new schema.Entity('categories', {
          event: event,
          selected_guild: guild
      })

      normalized = normalize(res.data, [category])
      break;

    case "score":
      guild = new schema.Entity('guilds')
      category = new schema.Entity('categories')
      score = new schema.Entity('scores', {
        category: category,
        guild: guild,
      })

      normalized = normalize(res.data, score)
      break;

    case "scores":
      guild = new schema.Entity('guilds')
      category = new schema.Entity('categories')
      score = new schema.Entity('scores', {
          category: category,
          guild: guild,
      })

      normalized = normalize(res.data, [score])
      break;

    case "results":
      guild = new schema.Entity('guilds')
      event = new schema.Entity('events')
      result = new schema.Entity('results', {
          guild: guild,
          event: event,
      })
      normalized = normalize(res.data, [result])
      break;

    default:
      throw new Error("Unknown response type: " + JSON.stringify(res))

  }

  Actions.updateEntities(normalized.entities)
}

Effect('getAllEvents', () => {
  fetch(`${API_BASE_URL}/api/events`)
  .then(res => res.json())
  .then(res => addApiResponseToState(res))
  .catch(err => console.error(err))
})

Effect('getEvent', (event_id) => {
  fetch(`${API_BASE_URL}/api/events/${event_id}`)
  .then(res => res.json())
  .then(res => addApiResponseToState(res))
  .catch(err => console.error(err))
})

Effect('getAllGuilds', () => {
  fetch(`${API_BASE_URL}/api/guilds`)
  .then(res => res.json())
  .then(res => addApiResponseToState(res))
  .catch(err => console.error(err))
})

Effect('getAllCategoriesForEvent', (event_id) => {
  fetch(`${API_BASE_URL}/api/events/${event_id}/categories`)
  .then(res => res.json())
  .then(res => addApiResponseToState(res))
  .catch(err => console.error(err))
})

Effect('getAllScoresForEvent', (event_id) => {
  fetch(`${API_BASE_URL}/api/events/${event_id}/scores`)
  .then(res => res.json())
  .then(res => addApiResponseToState(res))
  .catch(err => console.error(err))
})

Effect('setScoreForCategoryAndGuild', (payload) => {
  fetch(`${API_BASE_URL}/api/categories/${payload.category_id}/scores`,
  {
    method: 'post',
    body: JSON.stringify({
      score: {
        value: payload.value,
        guild_id: payload.guild_id
      }
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .then(res => addApiResponseToState(res))
  .catch(err => console.error(err))
})

Effect('selectGuildWonCategory', (payload) => {
  fetch(`${API_BASE_URL}/api/categories/${payload.category_id}/scores`,
  {
    method: 'post',
    body: JSON.stringify({
      score: {
        guild_id: payload.guild_id
      }
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .then(res => addApiResponseToState(res))
  .catch(err => console.error(err))
})

Effect('getResultsForEvent', (event_id) => {
  fetch(`${API_BASE_URL}/api/events/${event_id}/results`)
  .then(res => res.json())
  .then(res => addApiResponseToState(res))
  .catch(err => console.error(err))
})
