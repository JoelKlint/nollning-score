import React from 'react'
import './EventDetail.css'
import { Actions } from 'jumpstate'
import { connect } from 'react-redux'
import R from 'ramda'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import EditScore from './EditScore/EditScore'
import ReviewScore from './ReviewScore/ReviewScore'
import Results from './Results/Results'
import NotFound from '../NotFound'

class EventDetail extends React.Component {

    // Which life cycle method should be used?
    componentWillMount() {
        // Sync url state to redux state
        Actions.setCurrentEvent(this.props.match.params.event_id)
        // Get event from server
        Actions.getEvent(this.props.match.params.event_id)

        Actions.getAllGuilds()
        Actions.getAllCategoriesForEvent(this.props.match.params.event_id)
        Actions.getAllScoresForEvent(this.props.match.params.event_id)
    }
    render() {
        return (
            <div>
                <div className="SetScore_Title">
                    {this.props.event.name}
                </div>

                <Switch>
                    <Route path='/events/:event_id/edit' component={EditScore}/>
                    <Route path='/events/:event_id/review' component={ReviewScore} />
                    <Route path='/events/:event_id/results' component={Results} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

const Connect = connect(state => {
    return {
        event: R.pathOr({}, ['entities', 'events', state.current.event], state)
    }
})

export default Connect(EventDetail)