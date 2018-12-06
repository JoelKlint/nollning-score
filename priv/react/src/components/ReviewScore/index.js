import ReviewScore from './ReviewScore'
import { connect } from 'react-redux'
import R from 'ramda'

import {
  getUserHasAnsweredEverythingForEvent,
  getCurrentUserIsAdmin
} from '../../state/Selectors'

const stateful = connect((state, props) => {
  return {
    categories: R.pipe(
      R.pathOr({}, ['entities', 'categories']),
      R.pick( R.pathOr([], ['entities', 'events', state.current.event, 'categories'], state) ),
      R.values()
    )(state),
    answeredEverything: getUserHasAnsweredEverythingForEvent(state),
    isAdmin: getCurrentUserIsAdmin(state),
    goToNextScreen: () => props.history.push(`/events/${state.current.event}/contributions`)
  }
})

export default stateful(ReviewScore)
