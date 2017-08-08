import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'
import './Select.css'
import { Actions } from 'jumpstate'

import R from 'ramda';

class Select extends React.Component {

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
            <div className="Select_Base">
                <div className="Select_Slider">
                    {category.name}
                </div>
                <div className="Select_Select">
                    <div className="Select_GivenScore">{R.pathOr('-', ['value'], score)}</div>
                    <div className="Select_SliderWrapper">
                        <div>
                            <SelectField
                            floatingLabelText="Frequency"
                            value={this.state.value}
                            onChange={this.handleChange}
                            >
                                <MenuItem value={1} primaryText="D" />
                                <MenuItem value={2} primaryText="F" />
                                <MenuItem value={3} primaryText="E" />
                                <MenuItem value={4} primaryText="M" />
                                <MenuItem value={5} primaryText="V" />
                                <MenuItem value={6} primaryText="A" />
                                <MenuItem value={7} primaryText="K" />
                                <MenuItem value={8} primaryText="I" />
                                <MenuItem value={9} primaryText="Ing" />
                                <MenuItem value={10} primaryText="W" />
                            </SelectField>
                        </div>
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