import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './Select.css'
import { Actions } from 'jumpstate'

class Select extends Component {

  setSelected(id) {
    Actions.selectGuildWonCategory({
      category_id: this.props.question.id,
      guild_id: id
    })
  }

  render() {
    const category = this.props.question

    return (
      <div className="Select_Base">
        <div className="Select">
          <div>
            <SelectField
              floatingLabelText="Sektion"
              value={category.selected_guild}
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
