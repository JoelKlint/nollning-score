import React, { Component } from 'react'
import './ScoreCategories.css'
import RaisedButton from 'material-ui/RaisedButton';

import Slider from '../Slider'
import IntegerInput from '../IntegerInput'
import BooleanInput from '../BooleanInput'

class ScoreCategories extends Component {

  render() {

    const { user } = this.props

    const categories = this.props.categories.map(c => {
      if(c.absolute && user.role === "basic") {
        return []
      }
      else if(c.global === true) {
        return []
      }
      let input
      switch (c.type) {
        case 'interval':
          input = <Slider question={c} />
          break
        case 'integer':
          input = <IntegerInput question={c} />
          break
        case 'boolean':
          input = <BooleanInput question={c} />
          break
        case 'guild':
          input = <div>Select input question should not be rendered</div>
          break
        default:
          input = <div>Unacceptable question recieved</div>
          break
      }
      return (
        <div
          className="Category"
          key={c.id}
        >
          <div className="Name">{c.name}</div>
          {input}
        </div>
      )
    })

    return (
      <div className="ScoreCategories_Base">

        <div className="Categories">{categories}</div>

        <RaisedButton
          label="Överblick >"
          primary
          onClick={() => this.props.history.push(`/events/${this.props.currentEventId}/review`)}
        />
      </div>
    )
  }
}

export default ScoreCategories
