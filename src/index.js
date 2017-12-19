import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import App from './containers/App'

import './index.scss'


const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
)

const Root = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

render(Root, document.querySelector('#app'))
