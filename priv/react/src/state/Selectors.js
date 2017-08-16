import { createSelector } from 'reselect'
import R from 'ramda'

/**
 * Returns the current event
 * @param {object} state
 */
export const getCurrentEvent = (state) => {
  const eventId = state.current.event
  const event = R.pathOr({}, ['entities', 'events', eventId])(state)
  return event
}

/**
 * Returns all guilds by id in a map
 * @param {*} state
 */
export const getAllGuilds = (state) => R.pathOr({}, ['entities', 'guilds'])(state)

/**
 * Returns the specified guild
 * @param {*} state
 * @param {number} id
 */
export const getGuild = (state, id) => R.pathOr({}, ['entities', 'guilds', id])(state)

/**
 * Returns the current guild
 * @param {*} state
 */
export const getCurrentGuild = (state) => {
  const guildId = state.current.guild
  const guild = R.pathOr({}, ['entities', 'guilds', guildId])(state)
  return guild
}

/**
 * Returns the current user
 * @param {*} state
 */
export const getCurrentUser = (state) => {
  const userId = state.current.user
  return R.pathOr({}, ['entities', 'users', userId])(state)
}

/**
 * Returns a boolean value representating the admin status of the current user
 */
export const getIsAdmin = createSelector(
  [ getCurrentUser ],
  (user) => {
    return user.role === 'admin'
  }
)

/**
 * Returns all categories by id in a map
 * @param {*} state
 */
export const getAllCategories = (state) => R.pathOr({}, ['entities', 'categories'])(state)


/**
 * Returns all categories for the current event by id in a map
 */
export const getCategoriesForCurrentEvent = createSelector(
  [getAllCategories, getCurrentEvent],
  (allCategories, currentEvent) => {
    return R.filter(c => c.event === currentEvent.id)(allCategories)
  }
)

/**
 * Returns all categories for the current event
 * that are editable by the current user by id in a map
 */
export const getCategoriesEditableByUserForCurrentEvent = createSelector(
  [getCategoriesForCurrentEvent, getCurrentUser],
  (categoriesForCurrentEvent, currentUser) => {
    switch(currentUser.role) {
      case "basic":
        return R.reject(c => c.absolute === true)(categoriesForCurrentEvent)
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
export const getAllScores = (state) => R.pathOr({}, ['entities', 'scores'])(state)
export const getScoresByUser = createSelector(
  [getAllScores, getCurrentUser],
  (scores, user) => {
    return R.filter(s => s.user === user.id)(scores)
  }
)

/**
 * Returns a map with {key: value} = {guild_id: boolean}
 * describing whether the current user has answered all
 * questions for every guild
 */
export const getUserHasAnsweredEverythingForEventByGuild = createSelector(
  [
    getCategoriesEditableByUserForCurrentEvent,
    getScoresByUser,
    getAllGuilds
  ],
  (categories, scores, guilds) => {
    const categoriesAnsweredByGuild = R.map(g => {
      return R.map(c => {
        switch(c.type) {
          case "interval":
          case "integer":
          case "boolean":
            return R.any(s => s.category === c.id && s.guild === g.id)(R.values(scores))
          case "guild":
            return R.type(c.selected_guild) === "Number"
          default:
            console.error("CATEGORY WITH RANDOM TYPE IDENTIFIED!!")
            return new Error("CATEGORY WITH RANDOM TYPE IDENTIFIED")
        }
      })(categories)
    })(guilds)

    const finishedGuilds = R.map(g => {
      return R.pipe(
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
  (finishedWithGuild) => {
    return R.pipe(
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
  (scores, event) => {
    return R.filter(s => R.contains(s.category, event.categories))(scores)
  }
)

/**
 * Returns all scores for the category specified by categoryId
 * @param {*} state
 * @param {*} props
 */
export const getScoresForCategory = (state, props) => {
  const categoryId = props.categoryId
  const allScores = R.pathOr({}, ['entities', 'scores'], state)
  return R.filter(s => s.category === categoryId)(allScores)
}

/**
 * Returns the score for the category specified by categoryId
 * aswell as the current guild
 */
export const getScoreForCategoryAndCurrentGuild = createSelector(
  [getScoresForCategory, getCurrentGuild],
  (scores, guild) => {
    return R.pipe(
      R.values(),
      R.find(s => s.guild === guild.id)
    )(scores) || {}
  }
)


