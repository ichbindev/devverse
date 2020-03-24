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
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
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
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }    
        case ADD_POST:
            return {
                ...state,
                //the spreader in the array makes a copy of the post object and sends the payload
                // brad swapped th spreded state.post with the payload so the recent post is on top
                // however i just added a reload cb to the method to refresh the screen which gives the same result
                // this is a comment to mark this spot to change if i end up needing to do that for some reason for a bug
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
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload)
                },
                loading: false
            }            
        default:
            return state;        
    }
}