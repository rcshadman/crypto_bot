import AUTH_FAILED from '../type_actions'

export const API_URL = 'http://127.0.0.1:8000/api/'


function callApi(endpoint, config={method: 'GET'}, authenticatedRequest) {

  config.headers = Object.assign(config.headers || {}, {'Content-Type': `application/json`})

  let token = localStorage.getItem('cryptobot_authentication_token') || null

  if(authenticatedRequest) {
    if(token) {
      config.headers = Object.assign(config.headers, {'Authorization': `Jwt ${token}`})
    } else {
      throw new Error("No Jwt Token provided")
    }
  }

  if (config.body){
    config.body = JSON.stringify(config.body)
  }

  // Adapt to accept empty responses
  return fetch(API_URL + endpoint, config)
    .then(response =>
      response.json()
      .then(resource => ({ resource, response }))
    ).then(({ resource, response }) => {
      if (!response.ok) {
        return Promise.reject(resource)
      }      
      return resource
    })
}

export const CALL_API = Symbol('Call API')


export default store => next => action => {

  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticatedRequest, config } = callAPI

  if (typeof endpoint !== 'string') {
    throw new Error('No endpoints provided')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, config, authenticatedRequest).then(
    response => next(actionWith({
      response,
      authenticatedRequest,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      errorMessage: error || 'Error!'
    }))
  )
}
