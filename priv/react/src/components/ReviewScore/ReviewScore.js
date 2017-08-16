import React, { Component } from 'react'
import './ReviewScore.css'
import RaisedButton from 'material-ui/RaisedButton';

import IntegerReview from '../Review/IntegerReview'
import BooleanReview from '../Review/BooleanReview'
import SelectInput from '../Input/SelectInput'
import GuildSelectReview from '../Review/GuildSelectReview'

import IntervalReviewChart from '../Review/IntervalReviewChart'

class ReviewScore extends Component {

  render() {
    const {
      goToNextScreen,
      categories,
      answeredEverything,
      isAdmin
    } = this.props

    const renderedCategories = categories.map(c => {
      let input
      switch (c.type) {
        case 'interval':
          input = <IntervalReviewChart category={c} />
          break
        case 'integer':
          input = <IntegerReview category={c} />
          break
        case 'boolean':
          input = <BooleanReview category={c} />
          break
        case 'guild':
          input = isAdmin ? <SelectInput question={c} /> : <GuildSelectReview category={c}/>
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
              goToNextScreen()
            }
          }}
        />

      </div>
    )
  }
}

export default ReviewScore
