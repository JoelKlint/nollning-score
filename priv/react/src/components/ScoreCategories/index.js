import ScoreCategories from './ScoreCategories'
import { connect } from 'react-redux'
import {
  getCurrentGuild,
  getCurrentUser,
  getCategoriesForCurrentEvent
} from '../../state/Selectors'
import R from 'ramda'

const stateful = connect((state, props) => {
  return {
    categories: R.pipe(getCategoriesForCurrentEvent, R.values())(state),
    user: getCurrentUser(state) || {},
    currentGuild: getCurrentGuild(state) || {},
    goToNextScreen: () => props.history.push(`/events/${state.current.event}/review`)
  }
})
export default stateful(ScoreCategories)
