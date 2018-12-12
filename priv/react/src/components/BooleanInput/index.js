import BooleanInput from './BooleanInput'
import { connect } from 'react-redux'
import {
  getCurrentGuild,
  getScoresForCurrentEventAndGuildByCategory
} from '../../state/Selectors'
import Actions from '../../state/Actions'

const stateful = connect((state, { category }) => {

  const currentGuild = getCurrentGuild(state) || {}

  const setCheckedInBackend = (boolean) => {
    Actions.setScoreForCategoryAndGuild({
      category_id: category.id,
      guild_id: currentGuild.id,
      value: boolean ? 1 : 0
    })
  }

  return {
    setCheckedInBackend: setCheckedInBackend,
    score: getScoresForCurrentEventAndGuildByCategory(state)[category.id] || {},
  }
})

export default stateful(BooleanInput)
