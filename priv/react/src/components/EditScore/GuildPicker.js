import React from 'react'
import './GuildPicker.css'
import { Actions } from 'jumpstate'
import { connect } from 'react-redux'
import R from 'ramda'

import GuildPickerButton from './GuildPickerButton'

class GuildPicker extends React.Component {

    componentWillMount() {
        Actions.setCurrentGuild(1)
    }

    render() {
        return (
            <div className="GuildPicker_Base">
                <div className="GuildPicker_Buttons">
                    {this.props.guilds.map((g, i) => {
                        return (
                            <GuildPickerButton 
                                key={i} 
                                guild={g}
                                active={this.props.currentGuild.id === g.id}
                                onClick={() => Actions.setCurrentGuild(g.id)}
                            />
                        )
                    })}
                </div>
                <div className="GuildPicker_Current">
                    <u>{this.props.currentGuild.name || '?'}-sektionen</u>
                </div>
            </div>
        )
    }
}

const Connect = connect(state => {
    return {
        guilds: R.values(state.entities.guilds),
        currentGuild: R.pathOr({}, ['entities', 'guilds', state.current.guild], state),
    }
})
export default Connect(GuildPicker)