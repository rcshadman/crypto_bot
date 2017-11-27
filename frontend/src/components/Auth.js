import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

// Check if the user is authenticated before rendering the component
class Auth extends Component {
  render() {
    const { isAuthenticated, Child } = this.props
    
    if (!isAuthenticated) {
      return (
        <Redirect to='/'/>
      )
    }
    return (
      <Child {...this.props}/>
    )
  }
}


Auth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  Child: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  
  const {authReducer} = state

  const {
    isAuthenticated,
  } = authReducer
  
  return {
    isAuthenticated,
  }
}

export default connect(mapStateToProps)(withRouter(Auth))