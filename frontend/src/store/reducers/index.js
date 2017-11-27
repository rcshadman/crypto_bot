import {combineReducers} from 'redux'

import userReducer from './user'
import alertReducer from './alert'
import authReducer from './auth'


export default function theStore() {
  return rootReducer
}

const rootReducer = combineReducers({
  userReducer,
  alertReducer,
  authReducer
})