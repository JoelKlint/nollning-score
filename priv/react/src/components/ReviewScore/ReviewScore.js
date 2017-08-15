import React, { Component } from 'react'
import './ReviewScore.css'
import RaisedButton from 'material-ui/RaisedButton';

import IntervalReview from '../Review/IntervalReview'
import IntegerReview from '../Review/IntegerReview'
import BooleanReview from '../Review/BooleanReview'
import SelectInput from '../Input/SelectInput'

class ReviewScore extends Component {

  render() {
    const {
      currentEventId,
      categories,
      answeredEverything
    } = this.props

    const renderedCategories = categories.map(c => {
      let input
      switch (c.type) {
        case 'interval':
          input = <IntervalReview category={c} />
          break
        case 'integer':
          input = <IntegerReview category={c} />
          break
        case 'boolean':
          input = <BooleanReview category={c} />
          break
        case 'guild':
          input = <SelectInput question={c} />
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
      <div className="ReviewScore_Base">

        <div className="Categories">{renderedCategories}</div>

        <RaisedButton
          label="Avsluta >"
          primary
          onClick={() => {
            let shouldNavigate = true
            if(!answeredEverything) {
              shouldNavigate = confirm(`
                You have not answered everything!

                Click OK to continue anyway
              `)
            }
            if(shouldNavigate === true) {
              this.props.history.push(`/events/${currentEventId}/results`)
            }
          }}
        />

      </div>
    )
  }
}

export default ReviewScore
