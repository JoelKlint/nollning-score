import React, { Component } from 'react'
import './ScoreCategories.css'

import Slider from '../Slider'
import Select from '../Select'

class ScoreCategories extends Component {

    render() {
        return (
            <div className="ScoreCategories_Base">
                <div>
                    {this.props.categories.map((c, i) => {
                        switch (c.type) {
                            case 'interval': return <Slider key={i} question={c} /> 
                            case 'integer': return <p>Not implemented yet</p> 
                            case 'boolean': return <p>Not implemented yet</p>
                            case 'guild': return <Select key={i} question={c} /> 
                            default: return <div>Unacceptable question recieved</div>
                        }
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

export default ScoreCategories