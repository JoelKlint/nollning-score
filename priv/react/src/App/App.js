import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import PrivateRoute from '../components/PrivateRoute'

import NotFound from '../components/NotFound'

import EventPicker from '../components/EventPicker'
import EventDetail from '../components/EventDetail'
import Login from '../components/Login'

import { Actions } from 'jumpstate'

class App extends React.Component {

  constructor(props) {
    super(props)
    Actions.getCurrentUser()
  }

  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Redirect exact from='/' to='/events' />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/events' component={EventPicker} />
        <PrivateRoute path='/events/:event_id' component={EventDetail} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
    )
  }
}

export default App
