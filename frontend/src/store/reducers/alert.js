import {combineReducers} from 'redux'
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

function allAlertsReducer(state={
  isFetching: false,
  allAlerts: [],
  errorMessage: ''
}, action){
  switch(action.type) {
      case ALL_ALERTS:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case ALL_ALERTS_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          allAlerts: action.response,
          errorMessage: ''
        })
      case ALL_ALERTS_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.message
        })
      default:
        return state
  }
}

function singleAlertReducer(state={
  isFetching: false,
  singleAlert: {},
  errorMessage: ''
}, action){
  switch(action.type) {
      case ALERT:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case ALERT_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          singleAlert: action.response,
          errorMessage: ''
        })
      case ALERT_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.message
        })
      case MODIFY_ALERT:
        return Object.assign({}, state, {
          isFetching: true,
          saved: false,
        })
      case MODIFY_ALERT_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          singleAlert: action.response,
          saved: true,
          errorMessage: ''
        })
      case MODIFY_ALERT_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.message
        })
      case CREATE_ALERT:
        return Object.assign({}, state, {
          isFetching: true,
          created: false,
        })
      case CREATE_ALERT_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          singleAlert: action.response,
          created: true,
          errorMessage: ''
        })
      case CREATE_ALERT_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.message
        })
      case DELETE_ALERT:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case DELETE_ALERT_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          singleAlert: {},
          errorMessage: '',
          deleted: true,
        })
      case DELETE_ALERT_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.message,
        })
      default:
        return state
  }
}


const alertReducer = combineReducers({
  singleAlertReducer,
  allAlertsReducer
})

export default alertReducer