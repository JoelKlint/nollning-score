import React, { Component } from 'react'
import './ReviewScore.css'

import IntervalReview from '../Review/IntervalReview'
import IntegerReview from '../Review/IntegerReview'
import BooleanReview from '../Review/BooleanReview'

class ReviewScore extends Component {

  render() {
    const { currentEventId, categories } = this.props

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
          input = <div>Guild category type not yet implemented</div>
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

        <div>{renderedCategories}</div>

        <div
          className="EditButton"
          onClick={() => this.props.history.push(`/events/${currentEventId}/results`)}
        >
          <div>Finished</div>
        </div>

      </div>
    )
  }
}

export default ReviewScore
