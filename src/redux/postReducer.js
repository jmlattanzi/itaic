import axios from 'axios'

const initialState = {
    loading: false,
    err: false,
    posts: [],
    userPosts: [],
    post: {},
    post_likes: 0,
}

const baseUrl = 'https://itaic.co'

const GET_ALL_POSTS = 'GET_ALL_POSTS'
const GET_USER_POSTS = 'GET_USER_POSTS'
const GET_POST = 'GET_POST'
const DELETE_POST = 'DELETE_POST'
const EDIT_POST = 'EDIT_POST'
const LIKE_POST = 'LIKE_POST'
const GET_LIKES = 'GET_LIKES'

export const getAllPosts = () => {
    return {
        type: GET_ALL_POSTS,
        payload: axios.get(`${baseUrl}/posts/all`),
    }
}

export const getUserPosts = (user_id) => {
    return {
        type: GET_USER_POSTS,
        payload: axios.get(`${baseUrl}/posts/user/${user_id}`),
    }
}

export const getPost = (post_id) => {
    return {
        type: GET_POST,
        payload: axios.get(`${baseUrl}/posts/${post_id}`),
    }
}

export const deletePost = (post_id) => {
    return {
        type: DELETE_POST,
        payload: axios.delete(`${baseUrl}/posts/delete/${post_id}`),
    }
}

export const editPost = (post_id, caption) => {
    return {
        type: EDIT_POST,
        payload: axios.put(`${baseUrl}/posts/update/${post_id}`, {
            caption,
        }),
    }
}

export const likePost = (post_id) => {
    return {
        type: LIKE_POST,
        payload: axios.put(`${baseUrl}/posts/like/${post_id}`),
    }
}

export const getLikes = (post_id) => {
    return {
        type: GET_LIKES,
        payload: axios.get(`${baseUrl}/posts/like/${post_id}`),
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
            return {
                ...state,
                loading: false,
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
            return {
                ...state,
                loading: false,
                post: {
                    post_id: action.payload.data[0].id,
                    user_id: action.payload.data[0].user_id,
                    image_url: action.payload.data[0].image_url,
                    caption: action.payload.data[0].caption,
                    likes: action.payload.data[0].like_count,
                    edited: action.payload.data[0].edited,
                },
            }
        case `${GET_POST}_REJECTED`:
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
                posts: state.posts,
            }
        case `${DELETE_POST}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }
        case `${EDIT_POST}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${EDIT_POST}_FULFILLED`:
            return {
                ...state,
                loading: false,
                posts: state.posts,
            }
        case `${EDIT_POST}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }
        case `${LIKE_POST}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${LIKE_POST}_FULFILLED`:
            return {
                ...state,
                // loading: false,
            }
        case `${LIKE_POST}_REJECTED`:
            return {
                ...state,
                err: true,
                loading: false,
            }
        case `${GET_LIKES}_PENDING`:
            return {
                ...state,
                loading: true,
            }
        case `${GET_LIKES}_FULFILLED`:
            return {
                ...state,
                // loading: false,
                post_likes: action.payload.data[0].like_count,
            }
        case `${GET_LIKES}_REJECTED`:
            return {
                ...state,
                loading: false,
                err: true,
            }

        default:
            return state
    }
}
