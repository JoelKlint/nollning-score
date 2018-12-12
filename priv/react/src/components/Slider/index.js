import Slider from './Slider'
import { connect } from 'react-redux'
import {
  getCurrentGuild,
  getScoresForCurrentEventAndGuildByCategory,
} from '../../state/Selectors'
import Actions from '../../state/Actions'

const stateful = connect((state, { category }) => {

  const currentGuild = getCurrentGuild(state) || {}

  const sendScoreToBackend = (val) => {
    Actions.setScoreForCategoryAndGuild({
      category_id: category.id,
      guild_id: currentGuild.id,
      value: val
    })
  }

  return {
    score: getScoresForCurrentEventAndGuildByCategory(state)[category.id] || {},
    sendScoreToBackend: sendScoreToBackend
  }
})

export default stateful(Slider)
