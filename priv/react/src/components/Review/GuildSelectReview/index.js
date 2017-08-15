import GuildSelectReview from './GuildSelectReview'
import { connect } from 'react-redux'
import { getGuild } from '../../../state/Selectors'

const stateful = connect((state, props) => {

  const { category } = props

  return {
    guild: getGuild(state, category.selected_guild)
  }
})

export default stateful(GuildSelectReview)
