import React, { Component } from 'react'
import './Slider.css'
import RcSlider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import { Actions } from 'jumpstate'
import R from 'ramda';

class Slider extends Component {

  constructor(props) {
    super(props)
    this.state = {
        saved: true,
    }
  }

  setValue(val) {
    Actions.setScoreForCategoryAndGuild({
      category_id: this.props.question.id,
      guild_id: this.props.currentGuildId,
      value: val
    })
  }

  render() {
    const category = this.props.question

    // Find the score for this guild and category
    let score = R.find(score => score.guild === this.props.currentGuildId && score.category === category.id)(this.props.scores) || {}

    return (
      <div className="Slider_Base">
        <div className="Slider">
          <div className="GivenScore">{R.pathOr('-', ['value'], score)}</div>
          <div className="SliderWrapper">
            <RcSlider
              onChange={(e) => this.setValue(e)}
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
