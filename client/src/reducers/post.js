/**
 * initial state : [posts], post: null, loading: true, error: {}
 * /\works lke profile-error
 * 
 */
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST
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
        case ADD_POST:
            return {
                ...state,
                //the spreader in the array makes a copy of the post object and sends the payload
                posts: [...state.post, payload],
                loading: false
            }    
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }    
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes } : post),
                loading: false 
            }    
        default:
            return state;        
    }
}