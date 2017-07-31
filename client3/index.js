/* 
    ./client/index.js
*/

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import counterApp from './reducers'
import App from './components/App'

let store = createStore(counterApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
