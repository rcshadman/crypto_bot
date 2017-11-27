import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import {getSingleAlert, modifyAlert, deleteAlert} from '../store/actions/alert'

class SingleAlert extends Component {
  constructor(props) {
      super(props)

      const STATUS = {
        EDIT: 'EDIT',
        READ: 'READ'
      }

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
    const {dispatch, isFetching, match} = this.props
    const {operator, crypto, exchange, limit} = this.refs

    e.preventDefault()

    const data = {
      id: match.params.id,
      operator: operator.value,
      crypto_currency: crypto.value,
      exchange_currency: exchange.value,
      limit: limit.value
    }

    if (!isFetching){
      dispatch(modifyAlert(data))
    }
    return false
  }

  onClickEdit(e){
    const {available_status} = this.state
    this.setState({status: available_status.EDIT});
  }

  onClickRead(e){
    const {available_status} = this.state
    this.setState({status: available_status.READ});
  }

  onClickDelete(e){
    const {dispatch, match} = this.props
    dispatch(deleteAlert(match.params.id))
  }


  componentWillMount() {
    const {dispatch, match} = this.props

    dispatch(getSingleAlert(match.params.id))
  }

  componentDidUpdate(prevProps, prevState) {
    const {singleAlert, saved} = this.props
    const {available_status} = this.state
    if (prevProps.singleAlert !== singleAlert && saved){
      this.setState({status: available_status.READ});
    }
  }

  render() {
    const {singleAlert, errorMessage, isFetching, deleted} = this.props
    const {
      status,
      available_status,
      available_crypto,
      available_exchange,
      available_operator,
    } = this.state

    if (deleted){
      return (
        <Redirect to='/alerts'/>
      )
    }
    const {
      crypto_currency,
      exchange_currency,
      operator,
      limit,
      done,
      executed_at
    } = singleAlert
    
    return (
      <div>
        {
          status === available_status.READ ?
          <div>
            <p>Crypto currency : {crypto_currency}</p>
            <p>Exchange currency : {exchange_currency}</p>
            <p>Operator : {operator}</p>
            <p>Limit : {limit}</p>
            {done && <p>Already triggered</p>}
            {executed_at && <p>{executed_at}</p>}
          </div>
          :
          <form onSubmit={(e) => {this.onSubmit(e)}}>
            <div>
              <select required defaultValue={crypto_currency} ref="crypto">
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
              <select required defaultValue={exchange_currency} ref="exchange">
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
              <select required defaultValue="operator" ref="operator">
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
              <input ref="limit" type="number" defaultValue={limit} placeholder="limit"/>
            </div>
            <div>
              <input type="submit" value="Save"/>
            </div>
          </form>
        }

        <div>
          {
            status === available_status.READ ?
            <button onClick={(e) => {this.onClickEdit(e)}}>Edit</button>
            :
            <button onClick={(e) => {this.onClickRead(e)}}>Read</button>
          }
          <button onClick={(e) => {this.onClickDelete(e)}}>Delete</button>
        </div>
        {isFetching && <div>Processing...</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    )
  }
}


SingleAlert.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  
  const {singleAlertReducer} = state.alertReducer

  const {
    singleAlert,
    isFetching,
    errorMessage,
    saved,
    deleted,
  } = singleAlertReducer
  
  return {
    singleAlert,
    isFetching,
    errorMessage,
    saved,
    deleted,
  }
}

export default connect(mapStateToProps)(withRouter(SingleAlert))