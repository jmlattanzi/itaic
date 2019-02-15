import axios from 'axios'

const initialState = {
    loading: false,
    err: false,
    posts: [],
    userPosts: [],
    post: {},
}

const GET_ALL_POSTS = 'GET_ALL_POSTS'
const GET_USER_POSTS = 'GET_USER_POSTS'
const GET_POST = 'GET_POST'
const DELETE_POST = 'DELETE_POST'

export const getAllPosts = () => {
    return {
        type: GET_ALL_POSTS,
        payload: axios.get('/posts/all'),
    }
}

export const getUserPosts = (user_id) => {
    return {
        type: GET_USER_POSTS,
        payload: axios.get(`http://localhost:3001/posts/user/${user_id}`),
    }
}

export const getPost = (post_id) => {
    return {
        type: GET_POST,
        payload: axios.get(`http://localhost:3001/posts/${post_id}`),
    }
}

export const deletePost = (post_id) => {
    return {
        type: DELETE_POST,
        payload: axios.delete(`/posts/delete/${post_id}`),
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // get all posts
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

        // get user posts
        case `${GET_USER_POSTS}_PENDING`:
            return {
                ...state,
                loading: true,
            }

        case `${GET_USER_POSTS}_FULFILLED`:
            console.log('user posts: ', action.payload.data)
            return {
                ...state,
                userPosts: action.payload.data,
            }

        case `${GET_USER_POSTS}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }

        // get specific post
        case `${GET_POST}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${GET_POST}_FULFILLED`:
            console.log('>>> [GET POST PAYLOAD]:', action.payload.data)
            return {
                ...state,
                loading: false,
                post: {
                    post_id: action.payload.data[0].id,
                    user_id: action.payload.data[0].user_id,
                    image_url: action.payload.data[0].image_url,
                    caption: action.payload.data[0].caption,
                },
            }
        case `${GET_POST}_REJECTED`:
            console.log('GET_POST REJECTED')
            return {
                ...state,
                loading: false,
                err: true,
            }

        // delete post
        case `${DELETE_POST}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${DELETE_POST}_FULFILLED`:
            return {
                ...state,
                loading: false,
            }
        case `${DELETE_POST}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }

        default:
            return state
    }
}
