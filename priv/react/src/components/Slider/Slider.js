import React, { Component } from 'react'
import './Slider.css'
import RcSlider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

class Slider extends Component {

  state = {
    localScore: this.props.score.value || 0
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
          <div className="GivenScore">{localScore}</div>
          <div className="SliderWrapper">
            <RcSlider
              onChange={val => this.setState({localScore: val})}
              onAfterChange={val => sendScoreToBackend(val)}
              min={category.interval_min}
              max={category.interval_max}
              dots={true}
              value={localScore}
              handleStyle={{
                transform: 'scale(2)'
              }}
            />
          </div>
          {score.value === localScore ?
            <div className="Saved"></div>
            :
            <div className="NotSaved"></div>
          }
        </div>
      </div>
    )
  }
}

export default Slider
