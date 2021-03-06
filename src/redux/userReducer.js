import axios from 'axios'

const initialState = {
    loading: false,
    err: false,
    loggedIn: false,
    account: {},
    user: {},
    op: {},
}

const baseUrl = 'https://itaic.co'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const GET_CURRENT_USER = 'GET_CURRENT_USER'
const GET_USER = 'GET_USER'
const GET_ACCOUNT = 'GET_ACCOUNT'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

export const login = (username, password) => {
    return {
        type: LOGIN,
        payload: axios.post(`${baseUrl}/auth/login`, {
            username: username,
            password: password,
        }),
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
        payload: axios.get(`${baseUrl}/auth/logout`),
    }
}

export const getCurrentUser = () => {
    return {
        type: GET_CURRENT_USER,
        payload: axios.get(`${baseUrl}/auth/current`),
    }
}

export const getUser = (post_id) => {
    return {
        type: GET_USER,
        payload: axios.get(`${baseUrl}/user/${post_id}`),
    }
}

export const getAccount = (user_id) => {
    return {
        type: GET_ACCOUNT,
        payload: axios.get(`${baseUrl}/user/account/${user_id}`),
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
                // user: action.payload.data,
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
            return {
                ...state,
                loading: false,
                op: {
                    user_id: action.payload.data[0].id,
                    username: action.payload.data[0].username,
                    avatar: action.payload.data[0].avatar_url,
                },
            }
        case `${GET_USER}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }
        case `${GET_ACCOUNT}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${GET_ACCOUNT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                account: action.payload.data[0],
            }
        case `${GET_ACCOUNT}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }
        default:
            return state
    }
}
