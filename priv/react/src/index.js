import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { CreateJumpstateMiddleware } from 'jumpstate'

// Required by material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './index.css';

import State from './state/State'

import App from './App'

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
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
