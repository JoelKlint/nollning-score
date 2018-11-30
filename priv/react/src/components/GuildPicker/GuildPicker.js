import React, { Component } from 'react'
import './GuildPicker.css'
import Actions from '../../state/Actions'

import GuildPickerButton from '../GuildPickerButton'

class GuildPicker extends Component {

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

export default GuildPicker
