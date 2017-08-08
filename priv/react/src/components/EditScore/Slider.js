import React from 'react'
import { connect } from 'react-redux'
import './Slider.css'
import RcSlider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import { Actions } from 'jumpstate'

import R from 'ramda';

class Slider extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            saved: true,
        }
    }

    setValue(val) {

        // Update ui
        // this.setState({
        //     value: val,
        //     saved: false,
        // })

        Actions.setScoreForCategoryAndGuild({
            category_id: this.props.question.id, 
            guild_id: this.props.currentGuildId, 
            value: val
        })

        // Inform server
        // fetch(`http://192.168.0.100:4000/api/categories/${this.props.question.id}/scores`, 
        // {
        //     method: 'post', 
        //     body: JSON.stringify({
        //         score: {
        //             value: val,
        //             guild_id: this.props.currentGuildId
        //         }
        //     }),
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        // })
        // .then(res => res.json())
        // .then(res => {
        //     // Update ui
        //     this.setState({
        //         saved: true
        //     })
        // })
        // .catch(err => console.error(err))
    }

    render() {
        const category = this.props.question

        // Find the score for this guild and category
        let score = R.find(score => score.guild === this.props.currentGuildId && score.category === category.id)(this.props.scores) || {}

        return (
            <div className="Slider_Base">
                <div className="Slider_Slider">
                    {category.name}
                </div>
                <div className="Slider_Slider">
                    <div className="Slider_GivenScore">{R.pathOr('-', ['value'], score)}</div>
                    <div className="Slider_SliderWrapper">
                        <RcSlider 
                            onChange={(e) => this.setValue(e)}
                            min={category.min}
                            max={category.max}
                            dots={true}
                            value={R.pathOr(category.min, ['value'], score)}
                            handleStyle={{
                                transform: 'scale(2)'
                            }}
                        />
                    </div>
                    {this.state.saved ? 
                        <div className="Slider_Saved"></div>
                        :
                        <div className="Slider_NotSaved"></div>
                    }
                </div>
            </div>
        )
    }
}

const Connect = connect(state => {
    return {
        currentGuildId: state.current.guild,
        scores: R.pipe(     // Contains all scores for current event
            R.pathOr([], ['entities', 'scores', ]),
            R.values(),
            R.filter(score => R.contains(score.category, state.entities.events[state.current.event].categories))
        )(state)
    }
})

export default Connect(Slider)