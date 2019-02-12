import axios from 'axios'

const initialState = {
    loading: false,
    err: false,
    posts: [],
    comments: [],
}

const GET_ALL_POSTS = 'GET_ALL_POSTS'
const GET_COMMENTS_FOR_POST = 'GET_COMMENTS_FOR_POST'
const ADD_COMMENT = 'ADD_COMMENT'

export const getAllPosts = () => {
    return {
        type: GET_ALL_POSTS,
        payload: axios.get('/posts/all'),
    }
}

export const getComments = (postId) => {
    return {
        type: GET_COMMENTS_FOR_POST,
        payload: axios.get(`/posts/comments/${postId}`),
    }
}

export const addComment = (postId, userId, comment) => {
    return {
        type: ADD_COMMENT,
        payload: axios.post('/posts/comments', {
            post_id: postId,
            user_id: userId,
            comment: comment,
        }),
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
        case `${GET_COMMENTS_FOR_POST}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${GET_COMMENTS_FOR_POST}_FULFILLED`:
            return {
                ...state,
                comments: action.payload.data,
            }
        case `${GET_COMMENTS_FOR_POST}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }
        case `${ADD_COMMENT}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${ADD_COMMENT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                comments: action.payload.data,
            }
        case `${ADD_COMMENT}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }

        default:
            return state
    }
}
