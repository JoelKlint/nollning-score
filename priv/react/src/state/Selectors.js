import { createSelector } from 'reselect'
import R from 'ramda'

// EVENT SELECTORS
export const getCurrentEvent = (state) => {
  const eventId = state.current.event
  const event = R.pathOr({}, ['entities', 'events', eventId])(state)
  return event
}

// GUILD SELECTORS
export const getAllGuilds = (state) => R.pathOr({}, ['entities', 'guilds'])(state)

// USER SELECTORS
export const getCurrentUser = (state) => {
  const userId = state.current.user
  return R.pathOr({}, ['entities', 'users', userId])(state)
}
export const getIsAdmin = createSelector(
  [ getCurrentUser ],
  (user) => {
    return user.role === 'admin'
  }
)

// CATEGORIES SELECTORS
export const getAllCategories = (state) => R.pathOr({}, ['entities', 'categories'])(state)

export const getCategoriesForCurrentEvent = createSelector(
  [getAllCategories, getCurrentEvent],
  (allCategories, currentEvent) => {
    return R.filter(c => c.event === currentEvent.id)(allCategories)
  }
)

export const getCategoriesEditableByUserForCurrentEvent = createSelector(
  [getCategoriesForCurrentEvent, getCurrentUser],
  (categoriesForCurrentEvent, currentUser) => {
    switch(currentUser.role) {
      case "basic":
        return R.reject(c => c.absolute === true)(categoriesForCurrentEvent)
        break;
      case "admin":
        return categoriesForCurrentEvent
        break;
      default:
        return R.empty(categoriesForCurrentEvent)
        break;
    }
  }
)

// SCORE SELECTORS
export const getAllScores = (state) => R.pathOr({}, ['entities', 'scores'])(state)
export const getScoresByUser = createSelector(
  [getAllScores, getCurrentUser],
  (scores, user) => {
    return R.filter(s => s.user === user.id)(scores)
  }
)

export const getUserFinishedAnswersByGuild = createSelector(
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
            break;
          case "guild":
            return R.type(c.selected_guild) === "Number"
            break;
          default:
            console.error("CATEGORY WITH RANDOM TYPE IDENTIFIED!!")
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

export const getUserHasAnsweredEverything = createSelector(
  [getUserFinishedAnswersByGuild],
  (finishedWithGuild) => {
    return R.pipe(
      R.values(),
      R.all(answer => answer === true)
    )(finishedWithGuild)
  }
)


