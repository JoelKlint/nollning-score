import React from 'react'
import './BooleanInput.css'

import check_gray from './checkmark_gray.svg'
import check_green from './checkmark_green.svg'
import cross_gray from './cross_gray.svg'
import cross_red from './cross_red.svg'

class BooleanInput extends React.Component {

  render() {
    const { score, setCheckedInBackend } = this.props

    const noSrc = score.value === 0 ? cross_red : cross_gray
    const yesSrc = score.value === 1 ? check_green : check_gray

    return (
      <div className="BooleanInput_Base">
        <img
          className="No"
          src={noSrc}
          alt="No"
          onClick={() => setCheckedInBackend(false)}
        />
        <img
          className="Yes"
          src={yesSrc}
          alt="Yes"
          onClick={() => setCheckedInBackend(true)}
        />
      </div>
    )
  }
}

export default BooleanInput
