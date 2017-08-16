import React, { Component } from 'react'
import './Slider.css'
import RcSlider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import R from 'ramda';

class Slider extends Component {

  constructor(props) {
    super(props)
    this.state = {
        saved: true,
    }
  }

  render() {
    const { category, sendScoreToBackend, score } = this.props

    return (
      <div className="Slider_Base">
        <div className="Slider">
          <div className="GivenScore">{R.pathOr('-', ['value'], score)}</div>
          <div className="SliderWrapper">
            <RcSlider
              onChange={val => sendScoreToBackend(val)}
              min={category.interval_min}
              max={category.interval_max}
              dots={true}
              value={R.pathOr(0, ['value'], score)}
              handleStyle={{
                transform: 'scale(2)'
              }}
            />
          </div>
          {this.state.saved ?
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
