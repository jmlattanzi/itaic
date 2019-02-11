import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise-middleware'
import reducer from './reducer'

export default createStore(reducer, applyMiddleware(promise))
