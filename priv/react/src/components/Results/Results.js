import React from 'react'
import './Results.css'
import { connect } from 'react-redux'
import { Actions } from 'jumpstate'
import R from 'ramda'

class Results extends React.Component {

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

const Connect = connect(state => {
    return {
        currentEventId: state.current.event,
        results: R.pipe(
            R.pathOr({}, ['entities', 'results']),
            R.values(),
            R.filter(r => r.event == state. current.event),
            R.map(r => {
                r.guild = state.entities.guilds[r.guild]
                return r
            }),
            R.sortBy( R.prop('result') ),
            R.reverse(),
        )(state)
    }
})

export default Connect(Results)