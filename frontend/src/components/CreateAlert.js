import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect, history } from 'react-router-dom'
import {connect} from 'react-redux'

import {createAlert} from '../store/actions/alert'

class CreateAlert extends Component {
  constructor(props) {
      super(props)

      const STATUS = {
        EDIT: 'EDIT',
        READ: 'READ'
      }

      // TODO - share this with the SingleAlert Component
      this.state = {
        status: STATUS.READ,
        available_status: STATUS,
        available_crypto: {
          BTC: 'Bitcoin',
        },
        available_exchange: {
          USD: 'US dollars',
        },
        available_operator: {
          above: 'above',
          under: 'under',
        },
      }
  }

  onSubmit(e) {
    const {dispatch, isFetching} = this.props
    const {operator, crypto, exchange, limit} = this.refs

    e.preventDefault()

    const data = {
      operator: operator.value,
      crypto_currency: crypto.value,
      exchange_currency: exchange.value,
      limit: limit.value
    }

    if (!isFetching){
      dispatch(createAlert(data))
    }
    return false
  }

  render() {
    const {singleAlert, errorMessage, isFetching, created} = this.props
    const {
      status,
      available_status,
      available_crypto,
      available_exchange,
      available_operator,
    } = this.state

    // If the alert was created go the detail page of this last one
    if (created){
      return (
        <Redirect to={'/alerts/'+singleAlert.id}/>
      )
    }
    
    return (
      <div>
        <form onSubmit={(e) => {this.onSubmit(e)}}>
          <div>
            <select required ref="crypto">
              <option value="" disabled>Crypto currency</option>
              {
                Object.keys(available_crypto).map(function (key) {
                  return (
                    <option key={key}
                    value={key}>
                      {available_crypto[key]}
                    </option>
                  )
                  })
                }
            </select>
          </div>
          <div>
            <select required ref="exchange">
              <option value="" disabled>Exchange currency</option>
              {
                Object.keys(available_exchange).map(function (key) {
                  return (
                    <option key={key}
                    value={key}>
                      {available_exchange[key]}
                    </option>
                  )
                  })
                }
            </select>
          </div>
          <div>
            <select required ref="operator">
              <option value="" disabled>Operator</option>
              {
                Object.keys(available_operator).map(function (key) {
                  return (
                    <option key={key}
                    value={key}>
                      {available_operator[key]}
                    </option>
                  )
                  })
                }
            </select>
          </div>
          <div>
            <input ref="limit" type="number" placeholder="limit"/>
          </div>
          <div>
            <input type="submit" value="Create"/>
          </div>
        </form>
        <div>
        </div>
        {isFetching && <div>Processing...</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    )
  }
}


CreateAlert.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  
  const {singleAlertReducer} = state.alertReducer

  const {
    singleAlert,
    isFetching,
    errorMessage,
    created,
  } = singleAlertReducer
  
  return {
    singleAlert,
    isFetching,
    errorMessage,
    created,
  }
}

export default connect(mapStateToProps)(withRouter(CreateAlert))