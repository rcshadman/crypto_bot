import { CALL_API } from '../middleware/api'
import { 
  LOGIN, LOGIN_SUCCESS,
  LOGIN_FAILURE, LOGOUT,
  LOGOUT_SUCCESS, LOGOUT_FAILURE
} from '../type_actions'

export function login(creds) {
  return {
    [CALL_API]: {
      types: [ LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE ],
      endpoint: 'auth/jwt/create/',
      config: {
        method: 'POST',
        body:{
          email: creds.email,
          password: creds.password
        }
      },
      authenticatedRequest: false
    }
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('cryptobot_authentication_token');
    return dispatch(logoutSuccess());
  }
}