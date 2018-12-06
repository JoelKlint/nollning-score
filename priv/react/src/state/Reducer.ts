import R from 'ramda'
import {
  schema,
  normalize
} from 'normalizr'
import {
  UPDATE_ENTITIES,
  SET_CURRENT_GUILD,
  SET_CURRENT_EVENT,
  SET_CURRENT_USER,
  LOG_OUT
} from './ActionTypes'
import Actions from './Actions'
import {
  Action,
  Reducer
} from 'redux';

interface IAction extends Action {
  payload?: any
}
// TODO: Define state better
export interface IState {
  entities: any,
  current: {
    event?: number,
    guild?: number,
    user?: number
  }
}

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
export const getJwt = (): string => localStorage.getItem("jwt") || JWT_TOKEN

/**
 * Function that deletes the JWT from memory
 */
const deleteJwt = () => {
  localStorage.removeItem('jwt')
  JWT_TOKEN = R.empty(JWT_TOKEN)
}


/**
 * Define reducer
 */
const initialState = {
  entities: {},
  current: {
    event: undefined,
    guild: undefined,
    user: undefined
  }
}

export const data: Reducer<IState> = (state = initialState, action: IAction) => {
  const { payload } = action

  switch (action.type) {
    case UPDATE_ENTITIES:
      return R.assocPath(
        ['entities'],
        R.mergeDeepRight(state.entities, payload),
        state,
      )

    case SET_CURRENT_EVENT:
      return R.assocPath(['current', 'event'], Number(payload), state)

    case SET_CURRENT_GUILD:
      return R.assocPath(['current', 'guild'], Number(payload), state)

    case SET_CURRENT_USER:
      return R.assocPath(['current', 'user'], payload, state)

    case LOG_OUT:
      deleteJwt()
      const newState = R.assocPath(['current', 'user'], undefined, state)
      return R.assoc('entities', {}, newState)

    default:
        return state
  }
}

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
// TODO: Remove this
const addApiResponseToState = (res: any) => {
  return new Promise((resolve, reject) => {

    let category, event, guild, score, result, user, contribution

    switch(res.type) {

      case "login": {

        try {
          // Store token in local localStorage so it can be retrieved later
          localStorage.setItem('jwt', res.data.jwt)
        } catch (error) {
          // Incognito mode in safari seems to have issues with localStorage.
          // Therefore, put the JWT in this temporary variable
          JWT_TOKEN = res.data.jwt
        }

        user = new schema.Entity('users')
        const normalized = normalize(res.data.user, user)

        Actions.updateEntities(normalized.entities)
        Actions.setCurrentUser(res.data.user.id)
        break;
      }

      case "events": {
        category = new schema.Entity('categories')
        event = new schema.Entity('events', {
            categories: [category]
        })

        const normalized = normalize(res.data, [event])
        Actions.updateEntities(normalized.entities)
        break;
      }
      case "event": {
        category = new schema.Entity('categories')
        event = new schema.Entity('events', {
            categories: [category]
        })

        const normalized = normalize(res.data, event)
        Actions.updateEntities(normalized.entities)
        break;
      }
      case "guilds": {
        guild = new schema.Entity('guilds')

        const normalized = normalize(res.data, [guild])
        Actions.updateEntities(normalized.entities)
        break;
      }

      case "category": {
        event = new schema.Entity('events')
        guild = new schema.Entity('guilds')
        category = new schema.Entity('categories', {
            event: event,
            selected_guild: guild
        })

        const normalized = normalize(res.data, category)
        Actions.updateEntities(normalized.entities)
        break;
      }

      case "categories": {
        event = new schema.Entity('events')
        guild = new schema.Entity('guilds')
        category = new schema.Entity('categories', {
            event: event,
            selected_guild: guild
        })

        const normalized = normalize(res.data, [category])
        Actions.updateEntities(normalized.entities)
        break;
      }

      case "score": {
        guild = new schema.Entity('guilds')
        category = new schema.Entity('categories')
        user = new schema.Entity('users')
        score = new schema.Entity('scores', {
          category: category,
          guild: guild,
          user: user
        })

        const normalized = normalize(res.data, score)
        Actions.updateEntities(normalized.entities)
        break;
      }

      case "scores": {
        guild = new schema.Entity('guilds')
        category = new schema.Entity('categories')
        user = new schema.Entity('users')
        score = new schema.Entity('scores', {
            category: category,
            guild: guild,
            user: user
        })

        const normalized = normalize(res.data, [score])
        Actions.updateEntities(normalized.entities)
        break;
      }

      case "results": {
        guild = new schema.Entity('guilds')
        event = new schema.Entity('events')
        result = new schema.Entity('results', {
            guild: guild,
            event: event,
        })
        const normalized = normalize(res.data, [result])
        Actions.updateEntities(normalized.entities)
        break;
      }

      case "contributions": {
        guild = new schema.Entity('guilds')
        event = new schema.Entity('events')
        contribution = new schema.Entity('contributions', {
            guild: guild,
            event: event,
        })
        const normalized = normalize(res.data, [contribution])
        Actions.updateEntities(normalized.entities)
        break;
      }

      case "me": {
        user = new schema.Entity('users')
        const normalized = normalize(res.data, user)
        Actions.updateEntities(normalized.entities)
        Actions.setCurrentUser(res.data.id)
        break;
      }

      default: {
        reject(new Error("Unknown response type: " + JSON.stringify(res)))
      }

    }

    resolve()

  })
}

export const interpretApiResponse = (res: Response) => {
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

