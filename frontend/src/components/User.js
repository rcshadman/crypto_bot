import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {getUser} from '../store/actions/user'

class User extends Component {
  constructor(props) {
      super(props)

      const STATUS = {
        EDIT: 'EDIT',
        READ: 'READ'
      }

      this.state = {
        status: STATUS.READ,
        avaible_status: STATUS
      }
  }

  componentWillMount() {
    const {dispatch} = this.props

    dispatch(getUser())
  }

  render() {
    const {
      last_name,
      first_name,
      email,
      errorMessage
    } = this.props

    const {status, avaible_status} = this.state
    
    return (
      <div>
        <div>
          <p>Last name : {last_name}</p>
          <p>First name : {first_name}</p>
          <p>Email : {email}</p>
        </div>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    )
  }
}


User.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  
  const {userReducer} = state

  const {
    last_name,
    first_name,
    email,
    isFetching,
    errorMessage,
  } = userReducer
  
  return {
    last_name,
    first_name,
    email,
    isFetching,
    errorMessage,
  }
}

export default connect(mapStateToProps)(User)