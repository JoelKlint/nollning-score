import Results from './Results'
import { connect } from 'react-redux'
import R from 'ramda'

const stateful = connect(state => {
  const resultByGuild = R.pipe(
    R.pathOr({}, ['entities', 'results']),
    R.values(),
    R.groupBy(R.prop('guild')),
    R.map(r => R.head(r)),
  )(state)

  const guildsWithResult = R.pipe(
    R.pathOr({}, ['entities', 'guilds']),
    R.values(),
    R.map(g => {
      const guildResult = R.pathOr(0, [g.id, 'result'], resultByGuild)
      return R.assoc('result', guildResult, g)
    }),
    R.sortBy(R.prop('result')),
    R.reverse()
  )(state)

  return {
    currentEventId: state.current.event,
    guilds: guildsWithResult
  }
})

export default stateful(Results)
