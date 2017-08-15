import React, { Component } from 'react'
import './Login.css'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Actions } from 'jumpstate'
import { Redirect } from 'react-router-dom'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  login() {
    const { username, password } = this.state
    Actions.login({username: username, password: password})
    .catch(err => alert('Unauthenticated'))
  }

  render() {
    const { username, password } = this.state
    const { isAuthenticated } = this.props

    // Url that redirected here
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if(isAuthenticated) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div className="Login_base">
        <h1>Login</h1>
        <TextField
          hintText="Username"
          value={username}
          autoFocus
          onChange={(event, val) => this.setState({username: val})}
          onKeyPress={event => event.key === 'Enter' ? this.login() : null}
        />
        <br/>
        <TextField
          hintText="Lösenord"
          value={password}
          type='password'
          onChange={(event, val) => this.setState({password: val})}
          onKeyPress={event => event.key === 'Enter' ? this.login() : null}
        />
        <br/>
        <RaisedButton
          label="Login"
          primary
          onTouchTap={() => this.login()}
        />
      </div>
    )
  }
}

export default Login
