import { createStore, combineReducers, applyMiddleware } from 'redux'
import promise from 'redux-promise-middleware'
import pr from './postReducer'
import ur from './userReducer'

const combined = combineReducers({
    pr,
    ur,
})

export default createStore(combined, applyMiddleware(promise))
