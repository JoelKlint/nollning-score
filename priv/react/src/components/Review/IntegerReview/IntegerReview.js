import React from 'react'
import './IntegerReview.css'
import R from 'ramda'

import IntegerReviewEntry from '../IntegerReviewEntry'

class IntegerReview extends React.Component {
  render() {
    const category = this.props.category
    const scoresForGuild = R.pipe(
      R.filter(score => score.category === category.id),
      R.groupBy( R.prop('guild') ),
      R.map(k => R.head(k) )
    )(this.props.scores)

    return (
      <div className="IntegerReview_Base">
        {this.props.guilds.map((g, i) => {
          const c = category
          const s = scoresForGuild[g.id] || {}
          return (
            <IntegerReviewEntry key={i} guild={g} category={c} score={s} />
          )
        })}
      </div>
    )
  }
}

export default IntegerReview
