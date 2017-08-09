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
        score.value = score.value || 0

        return (
            <div className="BooleanInput_Base">
                <img 
                    className="No"
                    src={score.value ? cross_gray : cross_red} 
                    alt="No" 
                    onClick={() => this.setChecked(false)}
                />
                <img 
                    className="Yes"
                    src={score.value ? check_green : check_gray} 
                    alt="Yes" 
                    onClick={() => this.setChecked(true)}
                />
            </div>
        )
    }
}

export default BooleanInput