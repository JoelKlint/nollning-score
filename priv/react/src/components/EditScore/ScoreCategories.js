import React from 'react'
import './ScoreCategories.css'
import { connect } from 'react-redux'
import R from 'ramda'

import Slider from './ScoreType/Slider/Slider'
import Select from './ScoreType/Select/Select'

class ScoreCategories extends React.Component {

    render() {
        return (
            <div className="ScoreCategories_Base">
                <div>
                    {this.props.categories.map((c, i) => {
                        switch (c.type) {
                            case 'interval': return (<Slider key={i} question={c} />); break;
                            case 'integer': return (<p>Not implemented yet</p>); break;
                            case 'boolean': return (<p>Not implemented yet</p>); break;;
                            case 'guild': return (<Select key={i} question={c} />); break;
                            default: return;
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

const Connect = connect(state => {
    return {
        currentEventId: state.current.event,
        categories: R.filter(c => c.event === state.current.event)(R.values(state.entities.categories))
    }
})
export default Connect(ScoreCategories)