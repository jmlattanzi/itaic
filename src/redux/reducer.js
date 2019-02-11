import axios from 'axios'

const initialState = {
    loggedIn: false,
    user: {
        username: '',
        posts: [],
    },
}

const LOGIN = 'LOGIN'
const IS_AUTH = 'IS_AUTH'
const GET_USER = 'GET_USER'
const GET_ALL_POSTS = 'GET_ALL_POSTS'

export const getCurrentUser = () => {
    return {
        type: GET_USER,
        payload: axios.get('/auth/current'),
    }
}

export const login = (username, password) => {
    console.log(username, password)
    return {
        type: LOGIN,
        payload: axios.post('/auth/login', { username, password }),
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case `${GET_USER}_PENDING`:
            return {
                ...state,
                loggedIn: false,
            }

        case `${GET_USER}_FULFILLED`:
            console.log('getUser payload', action.payload)
            return {
                ...state,
                loggedIn: true,
                user: {
                    username: action.payload.data.username,
                },
            }

        case `${GET_USER}_REJECTED`:
            return {
                ...state,
                loggedIn: false,
            }

        case `${LOGIN}_FULFILLED`:
            console.log('login payload', action.payload)
            return {
                ...state,
                loggedIn: true,
                user: {
                    username: action.payload.data.username,
                },
            }

        case `${LOGIN}_REJECTED`:
            return {
                ...state,
                loggedIn: false,
            }

        default:
            return state
    }
}
