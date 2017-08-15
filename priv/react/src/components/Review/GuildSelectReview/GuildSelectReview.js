import React from 'react'
import './GuildSelectReview.css'

class GuildSelectReview extends React.Component {
  render() {
    const { guild } = this.props
    return (
      <div className="GuildSelectReview_Base">{guild.name || '-'}</div>
    )
  }
}

export default GuildSelectReview
