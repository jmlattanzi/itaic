import { createStore, combineReducers, applyMiddleware } from 'redux'
import promise from 'redux-promise-middleware'
import pr from './postReducer'
import ur from './userReducer'
import cr from './commentReducer'

const combined = combineReducers({
    pr,
    ur,
    cr,
})

export default createStore(combined, applyMiddleware(promise))
