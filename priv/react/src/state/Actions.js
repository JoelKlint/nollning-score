import feathers from '@feathersjs/client'
import { getStore } from './index'
import {
  UPDATE_ENTITIES,
  SET_CURRENT_EVENT,
  SET_CURRENT_GUILD,
  SET_CURRENT_USER,
  LOG_OUT
} from './ActionTypes';
import {
  interpretApiResponse,
  getJwt,
} from './Reducer'
import {
  schema,
  normalize
} from 'normalizr'

/**
 * Setup URL for the backend
 */
let API_BASE_URL
switch(process.env.NODE_ENV) {
  case 'test':
  case 'development':
    API_BASE_URL = process.env.REACT_APP_NOLLNING_SCORE_BACKEND_URL || 'http://localhost:3030'
    break;
  case 'production':
    API_BASE_URL = ''
    break;
  default:
    throw new Error(`Unknown node environment: ${String(process.env.NODE_ENV)}`)
    API_BASE_URL = ''
    break;
}

/**
 * Create feathers client
 */
const feathersClient = feathers();
feathersClient.configure(
  feathers.rest(API_BASE_URL).fetch(window.fetch)
)
feathersClient.configure(
  feathers.authentication()
)


const action = (type, payload) => {
  return {
    type,
    payload
  }
}

const dispatch = (action) => getStore().dispatch(action)

const Actions = {
  updateEntities: entities => {
    dispatch(action(UPDATE_ENTITIES, entities))
  },
  setCurrentEvent: id => {
    dispatch(action(SET_CURRENT_EVENT, id))
  },
  setCurrentGuild: id => {
    dispatch(action(SET_CURRENT_GUILD, id))
  },
  setCurrentUser: id => {
    dispatch(action(SET_CURRENT_USER, id))
  },
  logOut: () => {
    dispatch(action(LOG_OUT))
  },

  getAllEvents: () => {
    return fetch(`${API_BASE_URL}/api/events`, {
      headers: new Headers({
        'Authorization': `Bearer ${getJwt()}`
      })
    })
    .then(res => interpretApiResponse(res))
    .catch(err => console.error(err))
  },
  getEvent: id => {
    return fetch(`${API_BASE_URL}/api/events/${id}`, {
      headers: new Headers({
        'Authorization': `Bearer ${getJwt()}`
      })
    })
    .then(res => interpretApiResponse(res))
    .catch(err => console.error(err))
  },
  getAllGuilds: () => {
    return fetch(`${API_BASE_URL}/api/guilds`, {
      headers: new Headers({
        'Authorization': `Bearer ${getJwt()}`
      })
    })
    .then(res => interpretApiResponse(res))
    .catch(err => console.error(err))
  },
  getAllCategoriesForEvent: (id) => {
    return fetch(`${API_BASE_URL}/api/events/${id}/categories`, {
      headers: new Headers({
        'Authorization': `Bearer ${getJwt()}`
      })
    })
    .then(res => interpretApiResponse(res))
    .catch(err => console.error(err))
  },
  getAllScoresForEvent: id => {
    return fetch(`${API_BASE_URL}/api/events/${id}/scores`, {
      headers: new Headers({
        'Authorization': `Bearer ${getJwt()}`
      })
    })
    .then(res => interpretApiResponse(res))
    .catch(err => console.error(err))
  },
  setScoreForCategoryAndGuild: payload => {
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
  },
  selectGuildWonCategory: payload => {
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
  },
  getResultsForEvent: id => {
    return fetch(`${API_BASE_URL}/api/events/${id}/results`, {
      headers: new Headers({
        'Authorization': `Bearer ${getJwt()}`
      })
    })
    .then(res => interpretApiResponse(res))
    .catch(err => console.error(err))
  },
  getContributionsForEvent: id => {
    return fetch(`${API_BASE_URL}/api/events/${id}/my_contribution`, {
      headers: new Headers({
        'Authorization': `Bearer ${getJwt()}`
      })
    })
    .then(res => interpretApiResponse(res))
    .catch(err => console.error(err))
  },
  login: ({username, password}) => {
    return feathersClient.authenticate({
      strategy: 'local',
      email: username,
      password,
    }).then(res => {
      return feathersClient.service('me').find()
    }).then(user => {
      const userSchema = new schema.Entity('users')
      const normalized = normalize(user, userSchema)
      Actions.updateEntities(normalized.entities)
      Actions.setCurrentUser(user.id)
    })
  },
  getCurrentUser: () => {
    return fetch(`${API_BASE_URL}/me`, {
      headers: new Headers({
        'Authorization': `Bearer ${getJwt()}`
      })
    })
    .then(res => interpretApiResponse(res))
    .catch(err => console.error(err))
  }
}

export default Actions
