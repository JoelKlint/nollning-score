import React, { Component } from 'react'
import './GuildPickerButton.css'

class GuildPickerButton extends Component {
    render() {

        const style = {
            backgroundColor: this.props.guild.color,
        }
        if(this.props.guild.name === 'E') {
            style.color = 'white'
        }

        return (
            <div 
                className="GuildPickerButton_Base"
                style={this.props.active ? style : {}}
                onClick={this.props.onClick}
            >
                {this.props.guild.name}
            </div>
        )
    }
}

export default GuildPickerButton