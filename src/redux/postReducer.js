import axios from 'axios'

const initialState = {
    loading: false,
    err: false,
    posts: [],
}

const GET_ALL_POSTS = 'GET_ALL_POSTS'

export const getAllPosts = () => {
    return {
        type: GET_ALL_POSTS,
        payload: axios.get('/posts/all'),
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case `${GET_ALL_POSTS}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${GET_ALL_POSTS}_FULFILLED`:
            return {
                ...state,
                posts: action.payload.data,
            }
        case `${GET_ALL_POSTS}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }

        default:
            return state
    }
}
