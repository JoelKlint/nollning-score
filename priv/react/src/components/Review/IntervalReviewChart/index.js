import IntervalReviewChart from './IntervalReviewChart'
import { connect } from 'react-redux'
import R from 'ramda'

const stateful = connect((state, {category}) => {

  const guilds = R.pipe(
    R.pathOr([], ['entities', 'guilds']),
    R.values()
  )(state)

  const scores = R.pipe(
    R.pathOr([], ['entities', 'scores']),
    R.values()
  )(state)

  const scoresForGuild = R.pipe(
    R.filter(s => s.category === category.id),
    R.groupBy( R.prop('guild') ),
    R.map(k => R.head(k) )
  )(scores)

  const guildsWithScores = R.map(g => {
    const score = R.pathOr(0, [g.id, 'value'], scoresForGuild)
    return R.assocPath(['score'], score, g)
  })(guilds)

  return {
    guilds: guildsWithScores
  }
})

export default stateful(IntervalReviewChart)
