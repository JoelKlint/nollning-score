import React, { Component } from 'react'
import './EventDetail.css'
import { Actions } from 'jumpstate'
import { Route, Switch } from 'react-router-dom'

import EditScore from '../EditScore'
import ReviewScore from '../ReviewScore'
import Results from '../Results'
import NotFound from '../NotFound'

class EventDetail extends Component {

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

export default EventDetail