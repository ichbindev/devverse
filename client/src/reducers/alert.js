// ALERT_REDUCER
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
/**
 * initial state will start off as an empty array
 * THEN...
 *  [
 *      {
 *          id: 1,
 *          msg: 'Please login',
 *          alertType: 'success'
 *      }
 * ]
 * the msg will be displayed
 * and the alertType is for determining the color of the txt-font
 */
const initialState = [];

export default function alert(state = initialState, action) {
    // Desctucture the type and the payload from the action
    const { type, payload } = action;

    // action << TYPE && PAYLOAD
    // switch_stmnt
    switch (type) {
        // Depending on the type we have to determine what gets set to the 'state'
        case SET_ALERT:
            /**
             * State is immutable
             * so we have to include the state that's already there
             */
            // Sread_OPR :  ...state into an array
            return [ ...state, payload ];
        //=================================================================        
        case REMOVE_ALERT:
            // remove a specifc alert by its ID
            // * payload is JUST the ID
            return state.filter(alert => alert.id !== payload) ;
            // * * * * * Every reducer-switch WILL CONTAIN A DEFAULT! * * * * *
        default:
            return state;
    }   

}