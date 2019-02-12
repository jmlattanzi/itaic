import axios from 'axios'

const initialState = {
    loading: false,
    err: false,
    loggedIn: false,
    user: {},
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const GET_CURRENT_USER = 'GET_CURRENT_USER'

export const login = (username, password) => {
    return {
        type: LOGIN,
        payload: axios.post('/auth/login', { username, password }),
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
        payload: axios.get('/auth/logout'),
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
                loggedIn: true,
                user: action.payload.data,
            }
        case `${LOGIN}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }
        case `${LOGOUT}_PENDING`:
            return {
                ...state,
                loggedIn: false,
                user: {},
            }
        case `${LOGOUT}_FULFILLED`:
            return {
                ...state,
                loggedIn: false,
                user: {},
            }
        case `${LOGOUT}_REJECTED`:
            return {
                ...state,
                loggedIn: false,
                user: {},
            }
        case `${GET_CURRENT_USER}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${GET_CURRENT_USER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                loggedIn: true,
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
