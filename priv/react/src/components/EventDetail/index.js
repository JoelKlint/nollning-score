import EventDetail from './EventDetail'
import { connect } from 'react-redux'
import R from 'ramda'

const stateful = connect(state => {
    return {
        event: R.pathOr({}, ['entities', 'events', state.current.event], state)
    }
})

export default stateful(EventDetail)