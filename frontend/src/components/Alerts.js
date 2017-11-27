import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

import {Table} from 'react-bootstrap'

import {getAllAlerts} from '../store/actions/alert'

class Alerts extends Component {

  componentWillMount() {
    const {dispatch, isFetching} = this.props

    if (!isFetching){
      dispatch(getAllAlerts())
    }
  }

  render() {
    const {allAlerts, errorMessage} = this.props
    
    return (
      <div>
        <div>
          <Link to={"/alerts/create"}>Create a new Alert</Link>
        </div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Crypto</th>
              <th>Operator</th>
              <th>Limit</th>
              <th>Exchange</th>
              <th>Link</th>
            </tr> 
          </thead>
          <tbody>
          {
            allAlerts.map((alert, i) => {
              return (
                <tr key={alert.id}>
                  <td>{alert.id}</td>
                  <td>{alert.crypto_currency}</td>
                  <td>{alert.operator}</td>
                  <td>{alert.limit}</td>
                  <td>{alert.exchange_currency}</td>
                  <td><Link to={"/alerts/"+alert.id}>Link</Link></td>
                </tr>
              )
            })
          }
          </tbody>
        </Table>
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    )
  }
}


Alerts.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  
  const {allAlertsReducer} = state.alertReducer

  const {
    allAlerts,
    isFetching,
    errorMessage,
  } = allAlertsReducer
  
  return {
    allAlerts,
    isFetching,
    errorMessage,
  }
}

export default connect(mapStateToProps)(Alerts)