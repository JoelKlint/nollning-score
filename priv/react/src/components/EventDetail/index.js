import EventDetail from './EventDetail'
import { connect } from 'react-redux'
import R from 'ramda'
import {
  getCurrentUser,
  getCurrentEvent
} from '../../state/Selectors'
import { Actions } from 'jumpstate'

const stateful = connect((state, props) => {
  return {
    event: getCurrentEvent(state),
    user: getCurrentUser(state),
    logOut: () => Actions.logOut()
  }
})

export default stateful(EventDetail)
