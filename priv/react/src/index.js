import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { getStore } from './state';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App'
import './index.css';

// Required by material-ui
injectTapEventPlugin();

const store = getStore()

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
