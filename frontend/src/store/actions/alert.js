import { CALL_API } from '../middleware/api'
import {
  ALL_ALERTS,
  ALL_ALERTS_SUCCESS,
  ALL_ALERTS_FAILURE,

  ALERT,
  ALERT_SUCCESS,
  ALERT_FAILURE, 
  MODIFY_ALERT,
  MODIFY_ALERT_SUCCESS,
  MODIFY_ALERT_FAILURE, 
  CREATE_ALERT,
  CREATE_ALERT_SUCCESS,
  CREATE_ALERT_FAILURE, 
  DELETE_ALERT,
  DELETE_ALERT_SUCCESS,
  DELETE_ALERT_FAILURE, 
} from '../type_actions'


export function getAllAlerts() {
  return {
    [CALL_API]: {
      types: [ ALL_ALERTS, ALL_ALERTS_SUCCESS, ALL_ALERTS_FAILURE ],
      endpoint: 'alerts/',
      authenticatedRequest: true
    }
  }
}

export function getSingleAlert(id) {
  return {
    [CALL_API]: {
      types: [ ALERT, ALERT_SUCCESS, ALERT_FAILURE ],
      endpoint: `alerts/${id}`,
      authenticatedRequest: true
    }
  }
}

export function createAlert(data) {
  return {
    [CALL_API]: {
      types: [ CREATE_ALERT, CREATE_ALERT_SUCCESS, CREATE_ALERT_FAILURE ],
      endpoint: 'alerts/',
      config: {
        method: 'POST',
        body:{
          limit: data.limit,
          crypto_currency: data.crypto_currency,
          exchange_currency: data.exchange_currency,
          operator: data.operator
        }
      },
      authenticatedRequest: true
    }
  }
}

export function modifyAlert(data) {
  return {
    [CALL_API]: {
      types: [ MODIFY_ALERT, MODIFY_ALERT_SUCCESS, MODIFY_ALERT_FAILURE ],
      endpoint: `alerts/${data.id}`,
      config: {
        method: 'PUT',
        body:{
          limit: data.limit,
          crypto_currency: data.crypto_currency,
          exchange_currency: data.exchange_currency,
          operator: data.operator
        }
      },
      authenticatedRequest: true
    }
  }
}

// The empty response provoc an error, but the alert is well deleted
// TODO
export function deleteAlert(id) {
  return {
    [CALL_API]: {
      types: [ DELETE_ALERT, DELETE_ALERT_SUCCESS, DELETE_ALERT_FAILURE ],
      endpoint: `alerts/${id}`,
      config: {
        method: 'DELETE',
      },
      authenticatedRequest: true
    }
  }
}