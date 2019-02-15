import axios from 'axios'

const initialState = {
    loading: false,
    err: false,
    loggedIn: false,
    user: {},
    op: {},
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const GET_CURRENT_USER = 'GET_CURRENT_USER'
const GET_USER = 'GET_USER'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

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

export const getUser = (post_id) => {
    return {
        type: GET_USER,
        payload: axios.get(`http://localhost:3001/user/${post_id}`),
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // login
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

        // logout
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

        // get current user
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

        case `${GET_USER}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${GET_USER}_FULFILLED`:
            console.log('>>> [GET_USER FULFILLED]', action.payload.data)
            return {
                ...state,
                loading: false,
                op: {
                    user_id: action.payload.data[0].id,
                    username: action.payload.data[0].username,
                },
            }
        case `${GET_USER}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }
        default:
            return state
    }
}
