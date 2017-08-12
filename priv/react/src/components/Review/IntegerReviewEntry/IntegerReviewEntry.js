import React from 'react'
import './IntegerReviewEntry.css'

class IntegerReviewEntry extends React.Component {

  render() {
    const { score, guild } = this.props

    return (
      <div className="IntegerReviewEntry_Base">

        <div className="Guild">{guild.name}</div>

        <div className="Value">{typeof(score.value) === 'number' ? score.value : "-"}</div>

      </div>
    )
  }
}

export default IntegerReviewEntry
