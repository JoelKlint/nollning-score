import React from 'react'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, isAuthenticated, ...rest} = this.props

    return (
      <Route {...rest}
        render={props => {
          switch(isAuthenticated) {
            case true:
              return (
                <Component {...props} />
              )
            case false:
              return (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location}
                  }}
                />
              )
            default:
              break;
          }
        }}
      />
    )
  }
}

export default PrivateRoute
