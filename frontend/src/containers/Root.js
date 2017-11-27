import React from 'react'
import {render} from 'react-dom'
import PropTypes from 'prop-types'
import {Provider, connect} from 'react-redux'
import {Route, BrowserRouter, withRouter, Switch} from 'react-router-dom'

import Menu from '../components/Menu'
import Auth from '../components/Auth'
import Login from '../components/Login'
import Signup from '../components/Signup'
import User from '../components/User'
import Alerts from '../components/Alerts'
import SingleAlert from '../components/SingleAlert'
import CreateAlert from '../components/CreateAlert'

// this handles automaticly the redirections based on the authentication
const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Auth Child={Component} {...props}/>
  )}/>
)

const NoMatch = () => (
  <p>Sorry we couldn't find what you are looking for</p>
)

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Menu/>
        <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <AuthRoute exact path="/alerts" component={Alerts} />
        <AuthRoute path="/alerts/create" component={CreateAlert} />
        <AuthRoute path="/alerts/:id" component={SingleAlert} />
        <AuthRoute path="/user" component={User} />
        <Route component={NoMatch}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
