import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import rootReducer from './reducers'
import App from './containers/App'

import './index.scss'


const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
)

const RootHtml = () => (
  <LocaleProvider locale={zhCN}>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  </LocaleProvider>
)

render(<RootHtml />, document.querySelector('#app'))
