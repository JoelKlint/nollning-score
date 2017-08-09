import React, { Component } from 'react'
import './Results.css'
import R from 'ramda'
import { Actions } from 'jumpstate'

class Results extends Component {

    constructor(props) {
        super(props)
        Actions.getResultsForEvent(props.currentEventId)
    }

    render() {
        const { results } = this.props
        return (
            <div className="Results_Base">
                {results.map((r, i) => {
                    return (
                        <div key={i}>
                            {R.pathOr('-', ['guild', 'name'], r)} - {R.pathOr('-', ['result'], r)}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Results