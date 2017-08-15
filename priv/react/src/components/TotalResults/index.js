import TotalResults from './TotalResults'
import { connect } from 'react-redux'
import R from 'ramda'
import { Actions } from 'jumpstate'

const stateful = connect(state => {
  const resultByGuild = R.pipe(
    R.pathOr({}, ['entities', 'results']),
    R.values(),
    R.filter(r => r.event === state.current.event),
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
    guilds: guildsWithResult,
    getData: () => Actions.getResultsForEvent(state.current.event)
  }
})

export default stateful(TotalResults)
