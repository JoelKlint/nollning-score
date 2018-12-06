import GuildSelectReview from './GuildSelectReview'
import { connect } from 'react-redux'
import { getAllGuilds } from '../../../state/Selectors'

const stateful = connect((state, props) => {

  const { category } = props
  const guilds = getAllGuilds(state)
  const guild = guilds[category.selectedGuildId]

  return {
    guild: guild
  }
})

export default stateful(GuildSelectReview)
