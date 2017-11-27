import { CALL_API } from '../middleware/api'
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE, 
  MODIFY_USER,
  MODIFY_USER_SUCCESS,
  MODIFY_USER_FAILURE, 
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE, 
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE, 
} from '../type_actions'


export function getUser() {
  return {
    [CALL_API]: {
      types: [ GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE ],
      endpoint: 'me/',
      authenticatedRequest: true
    }
  }
}
export function register(data) {
  return {
    [CALL_API]: {
      types: [ CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE ],
      endpoint: 'users/create/',
      config: {
        method: 'POST',
        body:{
          email: data.email,
          last_name: data.last_name,
          first_name: data.first_name,
          password: data.password
        }
      },
      authenticatedRequest: false
    }
  }
}
export function deleteUser(password) {
  return {
    [CALL_API]: {
      types: [ DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE ],
      endpoint: 'users/delete/',
      config: {
        method: 'DELETE',
        body: {
          current_password: password
        }
      },
      authenticatedRequest: true
    }
  }
}