import React from 'react'
import './IntegerInput.css'
import R from 'ramda'

class IntegerInput extends React.Component {

  increment = () => {
    if(!this.maxLimitReached()) {
      this.props.sendScoreToBackend((this.props.score.value || 0) + 1)
    }
  }

  decrement = () => {
    if(!this.minLimitReached()) {
      this.props.sendScoreToBackend((this.props.score.value || 0) - 1)
    }
  }

  maxLimitReached = () => {
    const { category, score } = this.props
    if(R.isNil(category.interval_max)) {
      return false
    }
    else if(score.value < category.interval_max) {
      return false
    }
    else {
      console.error("Reached max level. This limit is not implemented in backend")
      return true
    }
  }

  minLimitReached = () => {
    const { category, score } = this.props
    if(R.isNil(category.interval_min)) {
      return false
    }
    else if(score.value > category.interval_min) {
      return false
    }
    else {
      console.error("Reached min level. This limit is not implemented in backend")
      return true
    }
  }

  render() {
    const { score } = this.props

    return (
      <div className="IntegerInput_Base">
        <div
          className={`Button ${this.minLimitReached() ? 'Disabled_Button' : ''}`}
          onTouchTap={() => this.decrement()}
        >
          -
        </div>

        <div className="Score">{typeof(score.value) === 'number' ? score.value : "-"}</div>

        <div
          className={`Button ${this.maxLimitReached() ? 'Disabled_Button' : ''}`}
          onTouchTap={() => this.increment()}
        >
          +
        </div>
      </div>
    )
  }
}

export default IntegerInput
