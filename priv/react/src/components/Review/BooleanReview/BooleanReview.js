import React from 'react'
import './BooleanReview.css'
import R from 'ramda'

import BooleanReviewEntry from '../BooleanReviewEntry'

class BooleanReview extends React.Component {
  render() {
    const category = this.props.category
    const scoresForGuild = R.pipe(
      R.filter(score => score.category === category.id),
      R.groupBy( R.prop('guild') ),
      R.map(k => R.head(k) )
    )(this.props.scores)

    return (
      <div className="BooleanReview_Base">
        {this.props.guilds.map((g, i) => {
          const c = category
          const s = scoresForGuild[g.id] || {}
          return (
            <BooleanReviewEntry key={i} guild={g} category={c} score={s} />
          )
        })}
      </div>
    )
  }
}

export default BooleanReview
