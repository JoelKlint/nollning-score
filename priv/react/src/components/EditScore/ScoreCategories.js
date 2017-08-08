import React from 'react'
import './ScoreCategories.css'
import { connect } from 'react-redux'
import R from 'ramda'

import Question from './Question'

class ScoreCategories extends React.Component {

    render() {
        return (
            <div className="ScoreCategories_Base">
                <div>
                    {this.props.categories.map((c, i) => {
                        return (
                            <Question key={i} question={c} />
                        )
                    })}
                </div>

                <div 
                    className="ScoreCategories_ReviewButton"
                    onClick={() => this.props.history.push(`/events/${this.props.currentEventId}/review`)}
                >
                    <div>Review</div>
                </div>
            </div>
        )
    }
}

const Connect = connect(state => {
    return {
        currentEventId: state.current.event,
        categories: R.filter(c => c.event === state.current.event)(R.values(state.entities.categories))
    }
})
export default Connect(ScoreCategories)