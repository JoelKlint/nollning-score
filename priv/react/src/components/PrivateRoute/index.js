import PrivateRoute from './PrivateRoute'
import { connect } from 'react-redux'

import { getIsLoggedIn } from '../../state/Selectors'

const stateful = connect(state => {
  return {
    isAuthenticated: getIsLoggedIn(state)
  }
})

export default stateful(PrivateRoute)
