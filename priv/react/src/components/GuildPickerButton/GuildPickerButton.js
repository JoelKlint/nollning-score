import React, { Component } from 'react'
import './GuildPickerButton.css'
import Color from 'color'

class GuildPickerButton extends Component {
  render() {

    const { guild } = this.props

    // Dynamically calculate color for readability
    const color = Color(guild.color)
    let style = { backgroundColor: guild.color }
    if(color.light()) {
      style.color = 'black'
    }
    else {
      style.color = 'white'
    }
    if(color.white() > 87) {
      style.backgroundColor = 'black'
      style.color = guild.color
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
