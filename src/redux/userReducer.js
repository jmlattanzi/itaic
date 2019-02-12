import axios from 'axios'

const initialState = {
    loading: false,
    err: false,
    loggedIn: false,
    user: {},
}

const LOGIN = 'LOGIN'
const GET_CURRENT_USER = 'GET_CURRENT_USER'

export const login = (username, password) => {
    return {
        type: LOGIN,
        payload: axios.post('/auth/login', { username, password }),
    }
}

export const getCurrentUser = () => {
    return {
        type: GET_CURRENT_USER,
        payload: axios.get('/auth/current'),
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case `${LOGIN}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${LOGIN}_FULFILLED`:
            return {
                ...state,
                user: action.payload.data,
            }
        case `${LOGIN}_REJECTED`:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                err: true,
            }
        case `${GET_CURRENT_USER}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${GET_CURRENT_USER}_FULFILLED`:
            return {
                ...state,
                user: action.payload.data,
            }
        case `${GET_CURRENT_USER}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }
        default:
            return state
    }
}
