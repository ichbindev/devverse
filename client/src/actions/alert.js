import {v4 as uuidv4} from 'uuid';
// >| DIPATCH ACTION |<
import { SET_ALERT, REMOVE_ALERT } from './types';

// want to be able to dispatch more than one action from this function
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuidv4();
    // dispatch: SET_ALERT
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
    // dispatch: REMOVE_ALERT
    // after 5 seconds || 5000 milliseconds
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};