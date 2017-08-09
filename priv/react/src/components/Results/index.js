import Results from './Results'
import { connect } from 'react-redux'
import R from 'ramda'

const stateful = connect(state => {
    return {
        currentEventId: state.current.event,
        results: R.pipe(
            R.pathOr({}, ['entities', 'results']),
            R.values(),
            R.filter(r => r.event === state.current.event),
            R.map(r => {
                r.guild = state.entities.guilds[r.guild]
                return r
            }),
            R.sortBy( R.prop('result') ),
            R.reverse(),
        )(state)
    }
})

export default stateful(Results)