import SelectInput from './SelectInput'
import { connect } from 'react-redux'
import R from 'ramda';

const stateful = connect(state => {
    return {
        currentGuildId: state.current.guild,
        scores: R.pipe(     // Contains all scores for current event
            R.pathOr([], ['entities', 'scores', ]),
            R.values(),
            R.filter(score => R.contains(score.category, state.entities.events[state.current.event].categories))
        )(state),
        guilds: R.values(state.entities.guilds),
        isAdmin: R.pathOr('basic', ['entities', 'users', state.current.user, 'role'], state) === 'admin'
    }
})

export default stateful(SelectInput)
