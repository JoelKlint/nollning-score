import ReviewScore from './ReviewScore'
import { connect } from 'react-redux'
import { values } from '../../state/Util'

import {
  getUserHasAnsweredEverythingForEvent,
  getCurrentUserIsAdmin,
  getCategoriesEditableByUserForCurrentEvent
} from '../../state/Selectors'

const stateful = connect((state, props) => {
  return {
    categories: values(getCategoriesEditableByUserForCurrentEvent(state)),
    answeredEverything: getUserHasAnsweredEverythingForEvent(state),
    isAdmin: getCurrentUserIsAdmin(state),
    goToNextScreen: () => props.history.push(`/events/${state.current.event}/contributions`)
  }
})

export default stateful(ReviewScore)
