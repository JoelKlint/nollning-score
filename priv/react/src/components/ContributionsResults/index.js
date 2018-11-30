import ContributionsResults from './ContributionsResults'
import { connect } from 'react-redux'
import R from 'ramda'
import Actions from '../../state/Actions'

const stateful = connect((state, props) => {
  const contributionByGuild = R.pipe(
    R.pathOr({}, ['entities', 'contributions']),
    R.values(),
    R.filter(c => c.event === state.current.event),
    R.groupBy(R.prop('guild')),
    R.map(r => R.head(r)),
  )(state)

  const guildsWithContributions = R.pipe(
    R.pathOr({}, ['entities', 'guilds']),
    R.values(),
    R.map(g => {
      const guildResult = R.pathOr(0, [g.id, 'result'], contributionByGuild)
      return R.assoc('result', guildResult, g)
    }),
    R.sortBy(R.prop('result')),
    R.reverse()
  )(state)

  return {
    guilds: guildsWithContributions,
    getData: () => Actions.getContributionsForEvent(state.current.event),
    goToNextScreen: () => props.history.push(`/events/${state.current.event}/results`)
  }
})

export default stateful(ContributionsResults)
