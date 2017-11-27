import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

import {login as loginAction} from '../store/actions/auth'

class Login extends Component {

  onSubmit(e) {
    const {dispatch, isAuthenticated, isFetching} = this.props
    const {email, password} = this.refs

    e.preventDefault()

    const creds = { 
      email: email.value.trim(),
      password: password.value.trim()
    }
    if (!isAuthenticated && !isFetching){
      dispatch(loginAction(creds))
    }
    return false
  }

  render() {
    const { 
      isAuthenticated,
      isFetching,
      errorMessage,
      email,
      first_name,
      last_name,
    } = this.props

    if (isAuthenticated) {
      return (
        <Redirect to='/alerts'/>
      )
    }
    
    return (
      <div>
        {(first_name && last_name) && <p>{last_name} {first_name} please log in now</p>}
        <form onSubmit={(e) => {this.onSubmit(e)}}>
          <div>
            <input
              type="email"
              required
              placeholder="Your Email"
              defaultValue={email}
              ref="email"
            />
          </div>
          <div>
            <input 
              type="password"
              required
              placeholder="Your Password"
              ref="password"
            />
          </div>
          <div>
            <input type="submit" value="Login"/>
          </div>
        </form>
        {isFetching && <div>Signing...</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    )
  }
}


Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  
  const {authReducer, userReducer} = state

  const {
    isAuthenticated,
    isFetching,
    errorMessage,
  } = authReducer

  const {
    last_name,
    first_name,
    email,
  } = userReducer
  
  return {
    last_name,
    first_name,
    email,
    isAuthenticated,
    isFetching,
    errorMessage,
  }
}

export default connect(mapStateToProps)(withRouter(Login))