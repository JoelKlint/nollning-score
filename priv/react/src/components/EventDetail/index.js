import EventDetail from './EventDetail'
import { connect } from 'react-redux'
import {
  getCurrentUser,
  getCurrentEvent
} from '../../state/Selectors'
import Actions from '../../state/Actions'

const stateful = connect((state, props) => {
  return {
    event: getCurrentEvent(state) || {},
    user: getCurrentUser(state),
    logOut: () => Actions.logOut()
  }
})

export default stateful(EventDetail)
