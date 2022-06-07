import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
//Reducer
import {
  authReducer,
  orderReducer,
  productReducer,
  promotionReducer,
  reportReducer,
  requestReducer,
  userReducer,
} from './reducers'
import reportWebVitals from './reportWebVitals'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
if (process.env.NODE_ENV !== 'development') console.log = () => {}

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  product: productReducer,
  promotion: promotionReducer,
  report: reportReducer,
  request: requestReducer,
  user: userReducer,
})

// const store = createStore(appReducer, composeEnhancer(applyMiddleware(thunk)));

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
  // rootElement.hasChildNodes()
  //   ? hydrate(App, rootElement)
  //   : render(App, rootElement)
)
reportWebVitals()

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
