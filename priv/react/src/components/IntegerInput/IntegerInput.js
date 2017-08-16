import React from 'react'
import './IntegerInput.css'

class IntegerInput extends React.Component {

  increment = () => this.props.sendScoreToBackend((this.props.score.value || 0) + 1)

  decrement = () => this.props.sendScoreToBackend((this.props.score.value || 0) - 1)

  render() {
    const { score } = this.props

    return (
      <div className="IntegerInput_Base">
        <div
          className="Button"
          onTouchTap={() => this.decrement()}
        >
          -
        </div>

        <div className="Score">{typeof(score.value) === 'number' ? score.value : "-"}</div>

        <div
          className="Button"
          onTouchTap={() => this.increment()}
        >
          +
        </div>
      </div>
    )
  }
}

export default IntegerInput
