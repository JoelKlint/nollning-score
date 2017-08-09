import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { CreateJumpstateMiddleware } from 'jumpstate'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

// Required by material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './index.css';

import State from './state/State'

import NotFound from './components/NotFound'

import EventPicker from './components/EventPicker'
import EventDetail from './components/EventDetail'
import Login from './components/Login'

import logger from 'redux-logger'
const store = createStore(
  State,
  applyMiddleware(
    CreateJumpstateMiddleware(),
    logger,
  )
)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/events' />
          <Route exact path='/login' component={Login} />
          <Route exact path='/events' component={EventPicker} />
          <Route path='/events/:event_id' component={EventDetail} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
