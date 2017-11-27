import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

import {logout} from '../store/actions/auth'


class Menu extends Component {

  onClick(e) {
    const {dispatch, isAuthenticated, isFetching} = this.props

    // Don't call if a request is already beging made
    // Could change our data while we request.
    // Avoid multiple times the same request
    if (!isFetching){
      dispatch(logout())
    }

    return false
  }

  render() {
    const {isAuthenticated} = this.props
    return (
      <div>
        {
          /* Show the routes according if the user is authenticated or not */
          isAuthenticated ? 
          <div>
            <li><Link to="/alerts">My alerts</Link></li>
            <li><Link to="/user">My profile</Link></li>
            <li><button onClick={(e) => {this.onClick(e)}}>Signout</button></li>
          </div>
          :
          <div>
            <ul>
              <li><Link to="/">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

Menu.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  
  const {authReducer} = state

  const {
    isAuthenticated,
    isFetching
  } = authReducer
  
  return {
    isAuthenticated,
    isFetching
  }
}

export default connect(mapStateToProps)(withRouter(Menu))