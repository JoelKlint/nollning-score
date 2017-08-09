import React, { Component } from 'react'
import './ReviewScore.css'
import R from 'ramda'

import CategoryReview from '../CategoryReview'

class ReviewScore extends Component {

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

export default ReviewScore