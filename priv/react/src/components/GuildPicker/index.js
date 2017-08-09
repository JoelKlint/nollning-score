import GuildPicker from './GuildPicker'
import { connect } from 'react-redux'
import R from 'ramda'

const stateful = connect(state => {
    return {
        guilds: R.values(state.entities.guilds),
        currentGuild: R.pathOr({}, ['entities', 'guilds', state.current.guild], state),
    }
})
export default stateful(GuildPicker)