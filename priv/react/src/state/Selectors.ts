// @flow
import { createSelector, Selector } from 'reselect'
import R from 'ramda'
import { IState } from './Reducer';

type TSelector<R> = Selector<IState, R>
export type ById<T> = { [key: number]: T }

const getState: TSelector<IState> = state => state

export const getAllEvents: TSelector<ById<IEvent>> = state => {
  return state.entities.events
}

export const getCurrentEvent = createSelector(
  [ getState, getAllEvents ], (state, events) => {
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

/**
 * Returns the current user
 * @param {*} state
 */
export const getCurrentUser = (state: IState): IUser => {
  const userId = state.current.user || ''
  return R.pathOr({}, ['entities', 'users', userId])(state)
}

/**
 * Returns a boolean value representating the admin status of the current user
 */
export const getIsAdmin = createSelector(
  [ getCurrentUser ],
  (user): boolean => {
    return user.role === 'admin'
  }
)

/**
 * Returns all categories by id in a map
 * @param {*} state
 */
export const getAllCategories = (state: IState): { [key: number]: ICategory } => {
  return R.pathOr({}, ['entities', 'categories'])(state)
}


/**
 * Returns all categories for the current event by id in a map
 */
export const getCategoriesForCurrentEvent = createSelector(
  [getAllCategories, getCurrentEvent],
  (allCategories, currentEvent): { [key: number]: ICategory } => {
    if (!currentEvent) {
      return {}
    }
    let result: { [key: number]: ICategory } = {}
    for (let id in allCategories) {
      if(allCategories[id].eventId === currentEvent.id) {
        result[id] = allCategories[id]
      }
    }
    return result
  }
)

/**
 * Returns all categories for the current event
 * that are editable by the current user by id in a map
 */
export const getCategoriesEditableByUserForCurrentEvent = createSelector(
  [getCategoriesForCurrentEvent, getCurrentUser],
  (categoriesForCurrentEvent, currentUser): { [key: number]: ICategory} => {
    switch(currentUser.role) {
      case "basic":
        let result: { [key: number]: ICategory } = {}
        for (let id in categoriesForCurrentEvent) {
          if(!categoriesForCurrentEvent[id].absolute) {
            result[id] = categoriesForCurrentEvent[id]
          }
        }
        return result
      case "admin":
        return categoriesForCurrentEvent
      default:
        return R.empty(categoriesForCurrentEvent)
    }
  }
)

/**
 * Returns all scores by id in a map
 * @param {*} state
 */
export const getAllScores = (state: IState): { [key: number]: IScore } => {
  return R.pathOr({}, ['entities', 'scores'])(state)
}
export const getScoresByUser = createSelector(
  [getAllScores, getCurrentUser],
  (scores, user): { [key: number]: IScore } => {
    let result: { [key: number]: IScore } = {}
    for (let id in scores) {
      if(scores[id].userId === user.id) {
        result[id] = scores[id]
      }
    }
    return result
  }
)

/**
 * Returns a map with {key: value} = {guild_id: boolean}
 * describing whether the current user has answered all
 * questions for every guild
 */
// TODO: Fix
export const getUserHasAnsweredEverythingForEventByGuild = createSelector(
  [
    getCategoriesEditableByUserForCurrentEvent,
    getScoresByUser,
    getAllGuilds
  ],
  (categories, scores, guilds): { [key: number]: boolean } => {
    const categoriesAnsweredByGuild = R.map(g => {
      return R.map(c => {
        // @ts-ignore
        switch(c.type) {
          case "interval":
          case "integer":
          case "boolean":
          // @ts-ignore
            return R.any(s => s.categoryId === c.id && s.guildId === g.id)(R.values(scores))
          case "guild":
          // @ts-ignore
            return R.type(c.selected_guild) === "Number"
          default:
            console.error("CATEGORY WITH RANDOM TYPE IDENTIFIED!!")
            return new Error("CATEGORY WITH RANDOM TYPE IDENTIFIED")
        }
        // @ts-ignore
      })(categories)
      // @ts-ignore
    })(guilds)

    const finishedGuilds = R.map(g => {
      // @ts-ignore
      return R.pipe(
        // @ts-ignore
        R.values(),
        R.all(answer => answer === true)
      )(g)
    })(categoriesAnsweredByGuild)

    return finishedGuilds
  }
)

/**
 * Returns a boolean value representing whether the current user
 * has answered all categories for all guilds for the current event
 */
export const getUserHasAnsweredEverythingForEvent = createSelector(
  [getUserHasAnsweredEverythingForEventByGuild],
  (finishedWithGuild): boolean => {
    // @ts-ignore
    return R.pipe(
      // @ts-ignore
      R.values(),
      R.all(answer => answer === true)
    )(finishedWithGuild)
  }
)

/**
 * Returns all scores for the current event by id in a map
 */
export const getScoresForCurrentEvent = createSelector(
  [getAllScores, getCurrentEvent],
  (scores, event): { [key: number]: IScore } => {
    // @ts-ignore
    return R.filter(s => R.contains(s.categoryId, event.categories))(scores)
  }
)

/**
 * Returns all scores for the category specified by categoryId
 * @param {*} state
 * @param {*} props
 */
export const getScoresForCategory = (state: IState, props: Object): { [key: number]: IScore } => {
  // @ts-ignore
  const categoryId = props.categoryId
  const allScores = R.pathOr({}, ['entities', 'scores'], state)
  // @ts-ignore
  return R.filter(s => s.categoryId === categoryId)(allScores)
}

/**
 * Returns the score for the category specified by categoryId
 * aswell as the current guild
 */
export const getScoreForCategoryAndCurrentGuild = createSelector(
  [getScoresForCategory, getCurrentGuild],
  (scores, guild): IScore => {
    // @ts-ignore
    return R.pipe(
      // @ts-ignore
      R.values(),
      // @ts-ignore
      R.find(s => s.guildId === guild.id)
    )(scores) || {}
  }
)

/**
 * Returns a boolean that represents where there is currently a logged in user
 */
export const getIsLoggedIn = createSelector(
  [getCurrentUser],
  (user): boolean => !R.isEmpty(user)
)
