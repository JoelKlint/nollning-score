import React, { Component } from 'react'
import './Slider.css'
import RcSlider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import R from 'ramda'

class Slider extends Component {

  state = {
    localScore: this.props.score.value
  }

  render() {
    const { category, sendScoreToBackend, score } = this.props
    const { localScore } = this.state

    // Set initial score if it exists
    if(score.value && !localScore) {
      this.setState({localScore: score.value})
    }

    return (
      <div className="Slider_Base">
        <div className="Slider">
          <div className="GivenScore">{R.isNil(localScore) ? '-' : localScore}</div>
          <div className="SliderWrapper">
            <RcSlider
              onChange={val => this.setState({localScore: val})}
              onAfterChange={val => sendScoreToBackend(val)}
              min={category.interval_min}
              max={category.interval_max}
              dots={true}
              value={localScore || 0}
              handleStyle={{
                transform: 'scale(2)'
              }}
            />
          </div>
          {this.renderStatusIcon()}
        </div>
      </div>
    )
  }

  renderStatusIcon = () => {
    const { score } = this.props
    const { localScore } = this.state
    if(R.isNil(score.value)) {
      return <div className="StatusIcon NoScore"></div>
    }
    else if(score.value === localScore) {
      return <div className="StatusIcon Saved"></div>
    }
    else {
      return <div className="StatusIcon NotSaved"></div>
    }
  }

}

export default Slider
