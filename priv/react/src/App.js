import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Actions } from 'jumpstate'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <h4>Featuring Redux + Jumpstate</h4>
        </div>
        <div className="App-intro">
          <h1>{ this.props.counter.count }</h1>
          <button onClick={ () => Actions.decrement() }>Decrement</button>
          <button onClick={ () => Actions.increment() }>Increment</button>
        </div>
      </div>
    );
  }
}

const Connect = connect(state => {
  return {
    counter: state.counter
  }
})

export default Connect(App);
