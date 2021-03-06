import axios from 'axios'

const initalState = {
	loading: false,
	err: false,
	comments: [],
}

const baseUrl = 'https://itaic.co'

const GET_COMMENTS = 'GET_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const UPDATE_COMMENT = 'UPDATE_COMMENT'

export const getComments = (post_id) => {
	return {
		type: GET_COMMENTS,
		payload: axios.get(`${baseUrl}/comments/${post_id}`),
	}
}

export const addComment = (post_id, user_id, comment) => {
	return {
		type: ADD_COMMENT,
		payload: axios.post(`${baseUrl}/comments/add`, {
			post_id: post_id,
			user_id: user_id,
			comment: comment,
		}),
	}
}

export const deleteComment = (comment_id) => {
	return {
		type: DELETE_COMMENT,
		payload: axios.delete(`${baseUrl}/comments/${comment_id}`),
	}
}

export const updateComment = (post_id, comment) => {
	return {
		type: UPDATE_COMMENT,
		payload: axios.put(`${baseUrl}/comments/${post_id}`, comment),
	}
}

export default function reducer(state = initalState, action) {
	switch (action.type) {
		case `${GET_COMMENTS}_PENDING`:
			return {
				...state,
				loading: true,
			}
		case `${GET_COMMENTS}_FULFILLED`:
			return {
				...state,
				loading: false,
				comments: action.payload.data,
			}
		case `${GET_COMMENTS}_REJECTED`:
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
				comments: [...state.comments, action.payload.data[0]],
			}
		case `${ADD_COMMENT}_REJECTED`:
			return {
				...state,
				loading: false,
				err: true,
			}
		case `${DELETE_COMMENT}_PENDING`:
			return {
				...state,
				loading: true,
			}
		case `${DELETE_COMMENT}_FULFILLED`:
			console.log('delete comment payload: ', action.payload.data)
			return {
				...state,
				comments: action.payload.data,
			}
		case `${DELETE_COMMENT}_REJECTED`:
			return {
				...state,
				loading: false,
				err: true,
			}
		default:
			return state
	}
}
