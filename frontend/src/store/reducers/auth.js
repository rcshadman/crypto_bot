import jwtDecode from 'jwt-decode'
import {
  LOGIN, LOGIN_SUCCESS,
  LOGIN_FAILURE, LOGOUT,
  LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '../type_actions'

function checkTokenExpiry() {
  let jwt = localStorage.getItem('cryptobot_authentication_token')
  if(jwt) {
    let jwtExp = jwtDecode(jwt).exp;
    let expiryDate = new Date(0);
    expiryDate.setUTCSeconds(jwtExp);

    if(new Date() < expiryDate) {
      return true;
    }
  }
  return false;  
}

export default function authReducer(state={
  isFetching: false,
  isAuthenticated: checkTokenExpiry()
}, action){
  switch(action.type) {
      case LOGIN:
        return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: false
        })
      case LOGIN_SUCCESS:
        localStorage.setItem('cryptobot_authentication_token', action.response.token)
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          errorMessage: ''
        })
      case LOGIN_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: false,
          errorMessage: action.message
        })
      case LOGOUT:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case LOGOUT_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: false
        })
      case LOGOUT_FAILURE:
        return Object.assign({}, state, {
          isFetching: false
        })
      default:
        return state
  }
}