import React from 'react'
import './BooleanInput.css'
import R from 'ramda'
import { Actions } from 'jumpstate'

import check_gray from './checkmark_gray.svg'
import check_green from './checkmark_green.svg'
import cross_gray from './cross_gray.svg'
import cross_red from './cross_red.svg'

class BooleanInput extends React.Component {

  setChecked(boolean) {
    Actions.setScoreForCategoryAndGuild({
      category_id: this.props.question.id,
      guild_id: this.props.currentGuildId,
      value: boolean ? 1 : 0
    })
  }

  render() {
    const category = this.props.question
    let score = R.find(score => score.guild === this.props.currentGuildId && score.category === category.id)(this.props.scores) || {}
    score.value = score.value

    const noSrc = score.value === 0 ? cross_red : cross_gray
    const yesSrc = score.value === 1 ? check_green : check_gray

    return (
      <div className="BooleanInput_Base">
        <img
          className="No"
          src={noSrc}
          alt="No"
          onClick={() => this.setChecked(false)}
        />
        <img
          className="Yes"
          src={yesSrc}
          alt="Yes"
          onClick={() => this.setChecked(true)}
        />
      </div>
    )
  }
}

export default BooleanInput
