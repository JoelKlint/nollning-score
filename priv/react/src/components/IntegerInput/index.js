import IntegerInput from './IntegerInput'
import { connect } from 'react-redux'
import {
  getCurrentGuild,
  getScoreForCategoryAndCurrentGuild
} from '../../state/Selectors'
import { Actions } from 'jumpstate'

const stateful = connect((state, { category }) => {

  const currentGuild = getCurrentGuild(state)

  const sendScoreToBackend = (val) => {
    Actions.setScoreForCategoryAndGuild({
      category_id: category.id,
      guild_id: currentGuild.id,
      value: val
    })
  }

  return {
    score: getScoreForCategoryAndCurrentGuild(state, {categoryId: category.id}),
    sendScoreToBackend: sendScoreToBackend
  }
})

export default stateful(IntegerInput)
