import React, { Component } from 'react'
import './ScoreCategories.css'

import Slider from '../Slider'
import Select from '../Select'
import IntegerInput from '../IntegerInput'

class ScoreCategories extends Component {

    render() {

        const categories = this.props.categories.map(c => {
            let input
            switch (c.type) {
                case 'interval': 
                    input = <Slider question={c} />
                    break 
                case 'integer': 
                    input = <IntegerInput question={c} />
                    break 
                case 'boolean': 
                    input = <p>Not implemented yet</p>
                    break
                case 'guild': 
                    input = <Select question={c} />
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
            <div className="ScoreCategories_Base">

                <div>{categories}</div>

                <div 
                    className="ReviewButton"
                    onClick={() => this.props.history.push(`/events/${this.props.currentEventId}/review`)}
                >
                    <div>Review</div>
                </div>
            </div>
        )
    }
}

export default ScoreCategories