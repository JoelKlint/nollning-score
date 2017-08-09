import React from 'react'
import './IntegerInput.css'
import R from 'ramda'
import { Actions } from 'jumpstate'

class IntegerInput extends React.Component {

    setValue(val) {
        Actions.setScoreForCategoryAndGuild({
            category_id: this.props.question.id, 
            guild_id: this.props.currentGuildId, 
            value: val
        })
    }

    render() {
        
        const category = this.props.question
        let score = R.find(score => score.guild === this.props.currentGuildId && score.category === category.id)(this.props.scores) || {}

        score.value = score.value || 0

        return (
            <div className="IntegerInput_Base">
                <div 
                    className="Button"
                    onTouchTap={() => this.setValue(score.value - 1)}
                >
                    -
                </div>

                <div
                    className="Score"
                >
                    {score.value}
                </div>

                <div 
                    className="Button"
                    onTouchTap={() => this.setValue(score.value + 1)}
                >
                    +
                </div>
            </div>
        )
    }
}

export default IntegerInput