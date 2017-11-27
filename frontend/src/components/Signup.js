import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

import {register} from '../store/actions/user'

class Signup extends Component {
  constructor(props) {
      super(props)

      // TODO - share this with the SingleAlert Component
      this.state = {
        errorForm: ''
      }
  }

  onSubmit(e) {
    const {dispatch, isAuthenticated, isFetching} = this.props
    const {email, last_name, first_name, password, password_confirm} = this.refs

    e.preventDefault()

    // Check both password are the same
    if (password.value.trim() == password_confirm.value.trim()){
      const creds = { 
        email: email.value.trim(),
        password: password.value.trim(),
        first_name: first_name.value.trim(),
        last_name: last_name.value.trim()
      }
      if (!isAuthenticated && !isFetching){
        dispatch(register(creds))
      }
    } else {
      this.setState({errorForm: "The two passwords aren't the same"});
    }

    
    return false
  }

  render() {
    const { isAuthenticated,
      isFetching,
      isFetching_auth,
      errorMessage,
      errorMessage_auth,
      created,
    } = this.props

    const { errorForm } = this.state

    // If already authenticated show his alerts
    if (isAuthenticated) {
      return (
        <Redirect to='/alerts'/>
      )
    }

    // If the account was created, redirect to the login page
    if (created) {
      return (
        <Redirect to='/'/>
      )
    }
    
    return (
      <div>
        <form onSubmit={(e) => {this.onSubmit(e)}}>
          <div>
            <input
              type="email"
              required
              placeholder="Your Email"
              ref="email"
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="Your Last name"
              ref="last_name"
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="Your First name"
              ref="first_name"
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
            <input 
              type="password"
              required
              placeholder="Again your Password"
              ref="password_confirm"
            />
          </div>
          <div>
            <input type="submit" value="Register !"/>
          </div>
        </form>
        {isFetching && <div>Registering...</div>}
        {errorMessage_auth && <div>{errorMessage_auth}</div>}
        {errorMessage && <div>{errorMessage}</div>}
        {errorForm && <div>{errorForm}</div>}
      </div>
    )
  }
}


Signup.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetching_auth: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  
  const {authReducer, userReducer} = state

  const {
    isAuthenticated,
    isFetching: isFetching_auth,
    errorMessage: errorMessage_auth,
  } = authReducer

  const {
    created,
    isFetching,
    errorMessage,
  } = userReducer
  
  return {
    isAuthenticated,
    isFetching_auth,
    isFetching,
    errorMessage_auth,
    errorMessage,
    created,
  }
}

export default connect(mapStateToProps)(withRouter(Signup))