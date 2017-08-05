/* 
    ./client/index.js
*/

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import counterApp from './reducers'
import App from './components/App'

axios
  .get("/settings")
  .then(function(result) {

    console.log('result', result.data.count);

    let store = createStore(
      counterApp,
      {count: result.data.count},
      applyMiddleware(thunk)
    )

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    )

    console.log('/settings', result.data);
  });

