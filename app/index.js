import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import App from './components/App'

let store = createStore(reducers)

render(
  <Provider store={store}>
    <App getState={store.getState}/>
  </Provider>,
  document.getElementById("root")
)
