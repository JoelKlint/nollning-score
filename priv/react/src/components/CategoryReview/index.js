import CategoryReview from './CategoryReview'
import { connect } from 'react-redux'
import R from 'ramda'

const stateful = connect(state => {
    return {
        guilds: R.pipe(
            R.pathOr([], ['entities', 'guilds']),
            R.values()
        )(state),

        scores: R.pipe(
            R.pathOr([], ['entities', 'scores']),
            R.values()
        )(state)
    }
})

export default stateful(CategoryReview)