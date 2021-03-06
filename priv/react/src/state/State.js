// @flow

import { State, Effect, Actions } from 'jumpstate'
import R from 'ramda'
import { schema, normalize } from 'normalizr'

/**
 * Holds the jwt for when localStorage is not accessible
 */
let JWT_TOKEN: string = ''

/**
 * Returns the jwt token.
 *
 * Incognito mode in safari seems to have issues with localstorage,
 * therefore this exists
 */
const getJwt = (): string => localStorage.getItem("jwt") || JWT_TOKEN

/**
 * Function that deletes the JWT from memory
 */
const deleteJwt = () => {
  localStorage.removeItem('jwt')
  JWT_TOKEN = R.empty(JWT_TOKEN)
}

/**
 * Setup URL for the backend
 */
let API_BASE_URL
switch(process.env.NODE_ENV) {
  case 'test':
  case 'development':
    API_BASE_URL = process.env.REACT_APP_NOLLNING_SCORE_BACKEND_URL || 'http://localhost:4000'
    break;
  case 'production':
    API_BASE_URL = ''
    break;
  default:
    console.error(`Unknown node environment: ${String(process.env.NODE_ENV)}`)
    API_BASE_URL = ''
    break;
}

export default State({

  initial: {
    entities: {},
    current: {
      event: undefined,
      guild: undefined,
      user: undefined
    }
  },

  updateEntities(state, entities) {
    return R.assocPath(
      ['entities'],
      R.mergeDeepRight(state.entities, entities),
      state,
    )
  },

  setCurrentEvent(state, event_id: number) {
    return R.assocPath(['current', 'event'], Number(event_id), state)
  },

  setCurrentGuild(state, guild_id: number) {
    return R.assocPath(['current', 'guild'], Number(guild_id), state)
  },

  setCurrentUser(state, user_id: number) {
    return R.assocPath(['current', 'user'], user_id, state)
  },

  logOut(state) {
    deleteJwt()
    const newState = R.assocPath(['current', 'user'], undefined, state)
    return R.assoc('entities', {}, newState)
  }

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
  return new Promise((resolve, reject) => {
    let normalized = {}

    let category, event, guild, score, result, user, contribution

    switch(res.type) {

      case "login":
        try {
          // Store token in local localStorage so it can be retrieved later
          localStorage.setItem('jwt', res.data.jwt)
        } catch (error) {
          // Incognito mode in safari seems to have issues with localStorage.
          // Therefore, put the JWT in this temporary variable
          JWT_TOKEN = res.data.jwt
        }

        user = new schema.Entity('users')
        normalized = normalize(res.data.user, user)

        Actions.updateEntities(normalized.entities)
        Actions.setCurrentUser(res.data.user.id)
        break;

      case "events":
        category = new schema.Entity('categories')
        event = new schema.Entity('events', {
            categories: [category]
        })

        normalized = normalize(res.data, [event])
        Actions.updateEntities(normalized.entities)
        break;

      case "event":
        category = new schema.Entity('categories')
        event = new schema.Entity('events', {
            categories: [category]
        })

        normalized = normalize(res.data, event)
        Actions.updateEntities(normalized.entities)
        break;

      case "guilds":
        guild = new schema.Entity('guilds')

        normalized = normalize(res.data, [guild])
        Actions.updateEntities(normalized.entities)
        break;

      case "category":
        event = new schema.Entity('events')
        guild = new schema.Entity('guilds')
        category = new schema.Entity('categories', {
            event: event,
            selected_guild: guild
        })

        normalized = normalize(res.data, category)
        Actions.updateEntities(normalized.entities)
        break;

      case "categories":
        event = new schema.Entity('events')
        guild = new schema.Entity('guilds')
        category = new schema.Entity('categories', {
            event: event,
            selected_guild: guild
        })

        normalized = normalize(res.data, [category])
        Actions.updateEntities(normalized.entities)
        break;

      case "score":
        guild = new schema.Entity('guilds')
        category = new schema.Entity('categories')
        user = new schema.Entity('users')
        score = new schema.Entity('scores', {
          category: category,
          guild: guild,
          user: user
        })

        normalized = normalize(res.data, score)
        Actions.updateEntities(normalized.entities)
        break;

      case "scores":
        guild = new schema.Entity('guilds')
        category = new schema.Entity('categories')
        user = new schema.Entity('users')
        score = new schema.Entity('scores', {
            category: category,
            guild: guild,
            user: user
        })

        normalized = normalize(res.data, [score])
        Actions.updateEntities(normalized.entities)
        break;

      case "results":
        guild = new schema.Entity('guilds')
        event = new schema.Entity('events')
        result = new schema.Entity('results', {
            guild: guild,
            event: event,
        })
        normalized = normalize(res.data, [result])
        Actions.updateEntities(normalized.entities)
        break;

      case "contributions":
        guild = new schema.Entity('guilds')
        event = new schema.Entity('events')
        contribution = new schema.Entity('contributions', {
            guild: guild,
            event: event,
        })
        normalized = normalize(res.data, [contribution])
        Actions.updateEntities(normalized.entities)
        break;

      case "me":
        user = new schema.Entity('users')
        normalized = normalize(res.data, user)
        Actions.updateEntities(normalized.entities)
        Actions.setCurrentUser(res.data.id)
        break;

      default:
        reject(new Error("Unknown response type: " + JSON.stringify(res)))

    }

    resolve()

  })
}

const interpretApiResponse = (res) => {
  return new Promise((resolve, reject) => {
    switch(res.status) {
      case 201:
      case 200:
        res.json()
        .then(res => addApiResponseToState(res))
        .then(() => resolve())
        break;
      case 401:
        reject(new Error(`Unauthenticated`))
        break;
      default:
        reject(new Error(`Recieved unexpected HTTP Status code: ${res.status}`))
        break;
    }

  })
}

Effect('getAllEvents', () => {
  return fetch(`${API_BASE_URL}/api/events`, {
    headers: new Headers({
      'Authorization': `Bearer ${getJwt()}`
    })
  })
  .then(res => interpretApiResponse(res))
  .catch(err => console.error(err))
})

Effect('getEvent', (event_id) => {
  return fetch(`${API_BASE_URL}/api/events/${event_id}`, {
    headers: new Headers({
      'Authorization': `Bearer ${getJwt()}`
    })
  })
  .then(res => interpretApiResponse(res))
  .catch(err => console.error(err))
})

Effect('getAllGuilds', () => {
  return fetch(`${API_BASE_URL}/api/guilds`, {
    headers: new Headers({
      'Authorization': `Bearer ${getJwt()}`
    })
  })
  .then(res => interpretApiResponse(res))
  .catch(err => console.error(err))
})

Effect('getAllCategoriesForEvent', (event_id) => {
  return fetch(`${API_BASE_URL}/api/events/${event_id}/categories`, {
    headers: new Headers({
      'Authorization': `Bearer ${getJwt()}`
    })
  })
  .then(res => interpretApiResponse(res))
  .catch(err => console.error(err))
})

Effect('getAllScoresForEvent', (event_id) => {
  return fetch(`${API_BASE_URL}/api/events/${event_id}/scores`, {
    headers: new Headers({
      'Authorization': `Bearer ${getJwt()}`
    })
  })
  .then(res => interpretApiResponse(res))
  .catch(err => console.error(err))
})

Effect('setScoreForCategoryAndGuild', (payload) => {
  return fetch(`${API_BASE_URL}/api/categories/${payload.category_id}/scores`,
  {
    method: 'post',
    body: JSON.stringify({
      score: {
        value: payload.value,
        guild_id: payload.guild_id
      }
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJwt()}`
    })
  })
  .then(res => interpretApiResponse(res))
  .catch(err => console.error(err))
})

Effect('selectGuildWonCategory', (payload) => {
  return fetch(`${API_BASE_URL}/api/categories/${payload.category_id}/scores`, {
    method: 'post',
    body: JSON.stringify({
      score: {
        guild_id: payload.guild_id
      }
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJwt()}`
    })
  })
  .then(res => interpretApiResponse(res))
  .catch(err => console.error(err))
})

Effect('getResultsForEvent', (event_id) => {
  return fetch(`${API_BASE_URL}/api/events/${event_id}/results`, {
    headers: new Headers({
      'Authorization': `Bearer ${getJwt()}`
    })
  })
  .then(res => interpretApiResponse(res))
  .catch(err => console.error(err))
})

Effect('getContributionsForEvent', (event_id) => {
  return fetch(`${API_BASE_URL}/api/events/${event_id}/my_contribution`, {
    headers: new Headers({
      'Authorization': `Bearer ${getJwt()}`
    })
  })
  .then(res => interpretApiResponse(res))
  .catch(err => console.error(err))
})

Effect('login', ({username, password}) => {
  return fetch(`${API_BASE_URL}/api/login`, {
    method: 'post',
    body: JSON.stringify({
      username: username,
      password: password
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => interpretApiResponse(res))
})

Effect('getCurrentUser', () => {
  return fetch(`${API_BASE_URL}/api/me`, {
    headers: new Headers({
      'Authorization': `Bearer ${getJwt()}`
    })
  })
  .then(res => interpretApiResponse(res))
  .catch(err => console.error(err))
})
