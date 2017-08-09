import EventPicker from './EventPicker'
import { connect } from 'react-redux'
import R from 'ramda'

const stateful = connect(state => {
    return {
        events: R.values(state.entities.events)
    }
})

export default stateful(EventPicker)