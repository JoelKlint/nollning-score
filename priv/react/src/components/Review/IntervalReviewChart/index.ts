import { connect } from 'react-redux';
import { ICategory, IGuild } from '../../../entities';
import { IState } from '../../../state/Reducer';
import { getAllGuilds, getScoresForCurrentEventByCategory } from '../../../state/Selectors';
import { asDict, values } from '../../../state/Util';
import IntervalReviewChart from './IntervalReviewChart';

interface IProps {
  category: ICategory
}

interface StateProps {
  guilds: (IGuild & { score: number })[]
}

const stateful = connect<StateProps, {}, IProps, IState>(
  (state, props) => {
    const initiatedGuilds = values(getAllGuilds(state)).map(g => ({
      ...g,
      score: 0
    }))
    const guilds = asDict(initiatedGuilds, 'id')
    console.log(guilds)
    const scores = getScoresForCurrentEventByCategory(state) || {}
    const categoryScores = asDict(scores[props.category.id] || [], 'guildId')
    values(categoryScores).forEach(s => {
      if (s.guildId && guilds[s.guildId] && s.value) {
        (guilds[s.guildId] || {score: 0}).score = s.value
      }
    })
    return {
      guilds: values(guilds)
    }
  }
)

export default stateful(IntervalReviewChart)
