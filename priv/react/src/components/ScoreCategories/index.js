import ScoreCategories from './ScoreCategories'
import { connect } from 'react-redux'
import R from 'ramda'

const stateful = connect(state => {
  const userId = R.path(['current', 'user'], state)
    return {
        currentEventId: state.current.event,
        categories: R.filter(c => c.event === state.current.event)(R.values(state.entities.categories)),
        user: R.pathOr({}, ['entities', 'users', userId], state)
    }
})
export default stateful(ScoreCategories)
