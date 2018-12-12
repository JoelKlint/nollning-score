import { createSelector, Selector } from 'reselect'
import { IState } from './Reducer';
import {
  values,
  asDict,
  groupBy
} from './Util';

type TSelector<R> = Selector<IState, R>
export type ById<T> = Partial<{ [key: string]: T }>

const getState: TSelector<IState> = state => state

export const getAllEvents: TSelector<ById<IEvent>> = state => {
  return state.entities.events
}

export const getCurrentEvent = createSelector(
  [getState, getAllEvents], (state, events) => {
    if (state.current.event) {
      return events[state.current.event]
    } else {
      return undefined
    }
  }
)


export const getAllGuilds: TSelector<ById<IGuild>> = state => {
  return state.entities.guilds
}

export const getCurrentGuild = createSelector(
  [getState, getAllGuilds], (state, guilds) => {
    if (state.current.guild) {
      return guilds[state.current.guild]
    } else {
      return undefined
    }
  }
)


const getAllUsers: TSelector<ById<IUser>> = state => {
  return state.entities.users
}

export const getCurrentUser = createSelector(
  [getState, getAllUsers], (state, users) => {
    if (state.current.user) {
      return users[state.current.user]
    } else {
      return undefined
    }
  }
)

export const getCurrentUserIsAdmin = createSelector(
  [getCurrentUser], (user) => {
    return user ? user.role === 'admin' : false
  }
)

export const getIsLoggedIn = createSelector(
  [getCurrentUser], (user) => {
    if (!user) {
      return false
    } else {
      return true
    }
  }
)


export const getAllCategories: TSelector<ById<ICategory>> = state => {
  return state.entities.categories
}

export const getCategoriesForCurrentEvent = createSelector(
  [getAllCategories, getCurrentEvent], (categories, event) => {
    if (!event) {
      return undefined
    }
    let filteredCategories = values(categories).filter(c => {
      return c.eventId === event.id
    })
    return asDict(filteredCategories, 'id')
  }
)

export const getCategoriesEditableByUserForCurrentEvent = createSelector(
  [getCategoriesForCurrentEvent, getCurrentUser], (categories, user) => {
    if (!user || !categories) {
      return {}
    }
    switch (user.role) {
      case 'basic':
        let filteredCategories = values(categories).filter(c => !c.absolute)
        return asDict(filteredCategories, 'id')
      case 'admin':
        return categories
      default:
        return undefined
    }
  }
)

export const getAllScores: TSelector<ById<IScore>> = (state) => {
  return state.entities.scores
}

export const getScoresByCurrentUser = createSelector(
  [getAllScores, getCurrentUser], (scores, user) => {
    if (!user) {
      return undefined
    }
    const filteredScores = values(scores).filter(s => {
      return s.userId === user.id
    })

    return asDict(filteredScores, 'id')
  }
)

export const getUserHasAnsweredEverythingForEventByGuild = createSelector(
  [
    getCategoriesEditableByUserForCurrentEvent,
    getScoresByCurrentUser,
    getAllGuilds
  ], (categories, scores, guilds) => {
    if (!categories || !scores) {
      return undefined
    }

    const scoresByCategory = groupBy(values(scores), 'categoryId')

    const guildAnswerList = values(guilds).map(g => {
      const allAnswers = values(categories).map(c => {
        switch (c.type) {
          case 'interval':
          case 'integer':
          case 'boolean':
            const categoryScores = scoresByCategory[c.id]
            if (!categoryScores) {
              return false
            }
            return categoryScores.some(s => {
              return s.guildId === g.id
            })
          case 'guild':
            return typeof c.selected_guildId === 'number'
          default:
            // Return false if unknown scores are found
            // TODO: Log some error
            return false
        }
      })
      return {
        guildId: g.id,
        hasAnswered: allAnswers.every(a => a === true)
      }
    })

    let initial: ById<boolean> = {}
    return guildAnswerList.reduce((result, guildAnswer) => {
      result[guildAnswer.guildId] = guildAnswer.hasAnswered
      return result
    }, initial)
  }
)

export const getUserHasAnsweredEverythingForEvent = createSelector(
  [getUserHasAnsweredEverythingForEventByGuild], (byGuild) => {
    if (!byGuild) {
      return false
    }
    return values(byGuild).every(entry => entry === true)
  }
)


export const getScoresForCurrentEvent = createSelector(
  [getAllScores, getCategoriesForCurrentEvent],
  (scores, categories) => {
    if (!categories) {
      return undefined
    }
    const categoryIds = values(categories).map(c => c.id)
    const scoreList = values(scores).filter(s => {
      return s.categoryId && categoryIds.indexOf(s.categoryId) > -1
    })
    return asDict(scoreList, 'id')
  }
)

export const getScoresForCurrentEventAndGuildByCategory = createSelector(
  [getScoresForCurrentEvent, getCurrentGuild], (scores, guild) => {
    if (!scores || !guild) {
      return undefined
    }
    let scoreList = values(scores).filter(s => s.guildId === guild.id)
    return asDict(scoreList, 'categoryId')
  }
)
