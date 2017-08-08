import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { CreateJumpstateMiddleware } from 'jumpstate'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import './index.css';

import State from './state/State'

import NotFound from './NotFound'

import EventPicker from './components/EventPicker'
import EventDetail from './components/EventDetail'


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
    <BrowserRouter>
      <Switch>
        <Redirect exact from='/' to='/events' />
        <Route exact path='/events' component={EventPicker} />
        <Route path='/events/:event_id' component={EventDetail} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
