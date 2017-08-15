import ReviewScore from './ReviewScore'
import { connect } from 'react-redux'
import R from 'ramda'

import {
  getUserHasAnsweredEverythingForEvent,
  getIsAdmin
} from '../../state/Selectors'

const stateful = connect(state => {
  return {
    currentEventId: state.current.event,
    categories: R.pipe(
      R.pathOr({}, ['entities', 'categories']),
      R.pick( R.pathOr([], ['entities', 'events', state.current.event, 'categories'], state) ),
      R.values()
    )(state),
    answeredEverything: getUserHasAnsweredEverythingForEvent(state),
    isAdmin: getIsAdmin(state)
  }
})

export default stateful(ReviewScore)
