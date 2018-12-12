import BooleanInput from './BooleanInput'
import { connect } from 'react-redux'
import {
  getCurrentGuild,
  getScoresForCurrentEventAndGuildByCategory
} from '../../state/Selectors'
import Actions from '../../state/Actions'

const stateful = connect((state, { category }) => {

  const currentGuild = getCurrentGuild(state) || {}
  const score = getScoresForCurrentEventAndGuildByCategory(state)[category.id]

  const setCheckedInBackend = score
  ? boolean => Actions.updateScore(score.id, {
    value: boolean ? 1 : 0
  })
  : boolean => Actions.createScore({
    value: boolean ? 1 : 0,
    categoryId: category.id,
    guildId: currentGuild.id
  })

  // const setCheckedInBackend = (boolean) => {
  //   Actions.setScoreForCategoryAndGuild({
  //     category_id: category.id,
  //     guild_id: currentGuild.id,
  //     value: boolean ? 1 : 0
  //   })
  // }

  return {
    setCheckedInBackend: setCheckedInBackend,
    score: score || {},
  }
})

export default stateful(BooleanInput)
