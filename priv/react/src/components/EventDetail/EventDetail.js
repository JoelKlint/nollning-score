import React, { Component } from 'react'
import './EventDetail.css'
import { Actions } from 'jumpstate'
import { Route, Switch } from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton';

import EditScore from '../EditScore'
import ReviewScore from '../ReviewScore'
import TotalResults from '../TotalResults'
import NotFound from '../NotFound'
import ContributionsResults from '../ContributionsResults'

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
    const { event, user, logOut } = this.props

    return (
      <div className="EventDetail_Base">
        <div className="Header">
          <RaisedButton
            primary
            label={`Logout ${user.username}`}
            className="LogoutButton"
            onClick={logOut}
          />
          <div className="Title">{event.name}</div>
        </div>

        <Switch>
          <Route path='/events/:event_id/edit' component={EditScore}/>
          <Route path='/events/:event_id/review' component={ReviewScore} />
          <Route path='/events/:event_id/results' component={TotalResults} />
          <Route path='/events/:event_id/contributions' component={ContributionsResults} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default EventDetail
