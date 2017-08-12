import React from 'react'
import './IntervalReviewEntry.css'
import RcSlider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

class IntervalReviewEntry extends React.Component {

  render() {
    const { category, score, guild } = this.props

    return (
      <div className="IntervalReviewEntry_Base">

        <div className="Guild">
          {guild.name}
        </div>

        <div className="Slider">
          <RcSlider
            disabled={true}
            min={category.interval_min}
            max={category.interval_max}
            dots={true}
            value={score.value || category.interval_min}
            handleStyle={{
                transform: 'scale(2)'
            }}
          />
        </div>

      </div>
    )
  }
}

export default IntervalReviewEntry
