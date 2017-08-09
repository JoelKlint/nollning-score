import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './Select.css'
import R from 'ramda';

class Select extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
        }
    }

    setSelected(id) {
        this.setState({selected: id})
        // Actions.setScoreForCategoryAndGuild({
        //     category_id: this.props.question.id, 
        //     guild_id: id, 
        //     value: 1
        // })
    }

    render() {
        const category = this.props.question

        // Find the score for this guild and category
        let score = R.find(score => score.guild === this.props.currentGuildId && score.category === category.id)(this.props.scores) || {}
        score.value = score.value || 0

        return (
            <div className="Select_Base">
                <div className="Select">
                    <div>
                        <SelectField
                            floatingLabelText="Sektion"
                            value={this.state.selected}
                            onChange={(event, index, id) => this.setSelected(id)}
                        >
                            {this.props.guilds.map(g => {
                                return (
                                    <MenuItem 
                                        key={g.id}
                                        value={g.id}
                                        primaryText={g.name}
                                    />
                                )
                            })}
                        </SelectField>
                    </div>
                </div>
            </div>
        )
    }
}

export default Select