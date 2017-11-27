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
  LOGOUT,
} from '../type_actions'

export default function userReducer(state={
  isFetching: false,
  last_name: null,
  first_name: null,
  email: null,
}, action){
  switch(action.type) {
      case GET_USER:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case GET_USER_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          last_name: action.response.last_name,
          first_name: action.response.first_name,
          email: action.response.email,
          errorMessage: ''
        })
      case GET_USER_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.message
        })
      case MODIFY_USER:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case MODIFY_USER_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          last_name: action.last_name,
          first_name: action.first_name,
          email: action.email,
          errorMessage: ''
        })
      case MODIFY_USER_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.message
        })
      case CREATE_USER:
        return Object.assign({}, state, {
          isFetching: true,
          created: false,
        })
      case CREATE_USER_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          last_name: action.response.last_name,
          first_name: action.response.first_name,
          email: action.response.email,
          errorMessage: '',
          created: true,
        })
      case CREATE_USER_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.message
        })
      case DELETE_USER:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case DELETE_USER_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          last_name: null,
          first_name: null,
          email: null,
          errorMessage: ''
        })
      case DELETE_USER_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.message
        })
      case LOGOUT:
        return Object.assign({}, state, {
          created: false,
        })
      default:
        return state
  }
}