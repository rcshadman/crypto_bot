// import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import './index.css'
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store'

// We create the store
const store = configureStore()

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);
registerServiceWorker();
