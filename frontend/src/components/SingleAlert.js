import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import {getSingleAlert, modifyAlert, deleteAlert} from '../store/actions/alert'

class SingleAlert extends Component {
  constructor(props) {
      super(props)

      // some CONSTS
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

  // When the edit form is submited
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

  // Goes in edit mode
  onClickEdit(e){
    const {available_status} = this.state
    this.setState({status: available_status.EDIT});
  }

  // Goes in reading mode
  onClickRead(e){
    const {available_status} = this.state
    this.setState({status: available_status.READ});
  }

  // Delete the alert
  // NOTE : The actual middleware doesn't support empty responses
  // the request work, but we don't receive a success on our side
  // TODO - Add a dialog to ensure that this is what the user want
  onClickDelete(e){
    const {dispatch, match, isFetching} = this.props
    if (!isFetching){
      dispatch(deleteAlert(match.params.id))
    }
  }


  componentWillMount() {
    const {dispatch, match, isFetching} = this.props

    if (!isFetching){
      dispatch(getSingleAlert(match.params.id))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {singleAlert, saved} = this.props
    const {available_status} = this.state
    // if a the alert has been modified go back to reading mode
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

    // If the actual alert has been deleted go back to main page
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
          /* Switch between reeding and editing mode */
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
            /* Switch between reeding and editing mode */
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