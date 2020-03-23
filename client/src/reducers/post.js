/**
 * initial state : [posts], post: null, loading: true, error: {}
 * /\works lke profile-error
 * 
 */
import {
    GET_POSTS,
    POST_ERROR
} from '../actions/types'


const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    // pull out type & payload from action
    const { type, payload } = action;
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;        
    }
}