import React from 'react'
import './ReviewScore.css'
import { connect } from 'react-redux'
import R from 'ramda'

import CategoryReview from './CategoryReview'

class ReviewScore extends React.Component {

    render() {
        const { currentEventId } = this.props
        return (
            <div className="ReviewScore_Base">
                <div>
                    {R.map(c => {
                        return (
                            <CategoryReview key={c.id} category={c}/>
                        )
                    })(this.props.categories)}
                </div>

                <div 
                    className="ReviewScore_EditButton"
                    onClick={() => this.props.history.push(`/events/${currentEventId}/results`)}
                >
                    <div>Finished</div>
                </div>

            </div>
        )
    }
}

const Connect = connect(state => {
    return {
        currentEventId: state.current.event,
        categories: R.pipe(
            R.pathOr({}, ['entities', 'categories']),
            R.pick( R.pathOr([], ['entities', 'events', state.current.event, 'categories'], state) ),
            R.values()
        )(state)
    }
})

export default Connect(ReviewScore)