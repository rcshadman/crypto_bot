import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import api from './middleware/api'
import getReducers from './reducers'


const loggerMiddleware = createLogger()
const reducers = getReducers()

export default function configureStore() {
  return createStore(
    reducers,
    applyMiddleware(
      api,
      thunkMiddleware,
      loggerMiddleware,
    )
  )
}