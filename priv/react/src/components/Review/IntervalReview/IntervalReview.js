import React, { Component } from 'react'
import './IntervalReview.css'
import R from 'ramda'

import IntervalReviewEntry from '../IntervalReviewEntry'

class IntervalReview extends Component {

  render() {
    const category = this.props.category
    const scoresForGuild = R.pipe(
      R.filter(score => score.category === category.id),
      R.groupBy( R.prop('guild') ),
      R.map(k => R.head(k) )
    )(this.props.scores)

    return (
      <div className="IntervalReview_Base">
        {this.props.guilds.map((g, i) => {
          const c = category
          const s = R.pathOr({}, [g.id], scoresForGuild)
          return (
            <IntervalReviewEntry key={i} guild={g} category={c} score={s} />
          )
        })}
      </div>
    )
  }
}

export default IntervalReview
