import React, { Component } from 'react'
import './Login.css'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            guild: '',
            password: ''
        }
    }

    login() {
        alert(`Logging in with parameters\n Guild: ${this.state.guild}\n Password: ${this.state.password}`)
    }

    render() {
        return (
            <div className="Login_base">
                <h1>Login</h1>
                <TextField 
                    hintText="Sektion" 
                    value={this.state.guild}
                    onChange={(event, val) => this.setState({guild: val})}
                />
                <br/>
                <TextField 
                    hintText="Lösenord" 
                    value={this.state.password}
                    onChange={(event, val) => this.setState({password: val})}
                    type='text'
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