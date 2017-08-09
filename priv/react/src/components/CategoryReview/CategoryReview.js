import React, { Component } from 'react'
import './CategoryReview.css'
import R from 'ramda'

import CategoryReviewEntry from '../CategoryReviewEntry'

class CategoryReview extends Component {

    render() {
        const category = this.props.category
        // const scores = R.groupBy(R.prop('category'))(this.props.scores)
        const scoresForGuild = R.pipe(
            R.filter(score => score.category === category.id),
            R.groupBy( R.prop('guild') ),
            R.map(k => R.head(k) )
        )(this.props.scores)

        // const guilds = this.props.guilds.map(g => {
        //     const guildScore = R.pathOr({}, [g.id], scoresForGuild)
        //     return R.assoc('score', guildScore, g)
        // })

        return (
            <div className="CategoryReview_Base">
                <div className="CategoryReview_Title">{category.name}</div>
                {this.props.guilds.map((g, i) => {
                    const c = category
                    const s = R.pathOr({}, [g.id], scoresForGuild)
                    return (
                        <CategoryReviewEntry key={i} guild={g} category={c} score={s} />
                    )
                })}
            </div>
        )
    }
}

export default CategoryReview