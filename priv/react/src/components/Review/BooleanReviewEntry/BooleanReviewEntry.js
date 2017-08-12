import React from 'react'
import './BooleanReviewEntry.css'
import checkmark from './checkmark_green.svg'
import cross from './cross_red.svg'

class BooleanReviewEntry extends React.Component {

  render() {
    const { score, guild } = this.props

    let res
    const imgSrc = score.value ? checkmark : cross
    const imgAlt = score.value ? "Yes" : "No"
    switch(score.value) {
      case 0:
      case 1:
        res = (
          <img
            className="Image"
            src={imgSrc}
            alt={imgAlt}
          />
        )
        break;
      default:
        res = "-"
        break;
    }

    return (
      <div className="BooleanReviewEntry_Base">

        <div className="Guild">{guild.name}</div>

        {res}

      </div>
    )
  }
}

export default BooleanReviewEntry
