import PrivateRoute from './PrivateRoute'
import { connect } from 'react-redux'

const stateful = connect(state => {
  return {
    isAuthenticated: !!state.current.user
  }
})

export default stateful(PrivateRoute)
