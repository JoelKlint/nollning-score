import Slider from './Slider'
import { connect } from 'react-redux'
import {
  getCurrentGuild,
  getScoresForCurrentEventAndGuildByCategory,
} from '../../state/Selectors'
import Actions from '../../state/Actions'

const stateful = connect((state, { category }) => {
  const currentGuild = getCurrentGuild(state) || {}
  const scores = getScoresForCurrentEventAndGuildByCategory(state)
  const score = scores ? scores[category.id] : undefined

  const sendScoreToBackend = score
  ? (val) => Actions.updateScore(score.id, {
    value: val
  })
  : (val) => Actions.createScore({
    value: val,
    categoryId: category.id,
    guildId: currentGuild.id
  })

  return {
    score: score || {},
    sendScoreToBackend: sendScoreToBackend
  }
})

export default stateful(Slider)
