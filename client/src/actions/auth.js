// requests to backend made here
import axios from 'axios';
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken'

// Load User
export const loadUser = () => async dispatch => {
    // check local storage here and in app.js
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    // then make request
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
};

// Register a user
export const register = ({ 
    name, 
    email, 
    avatar, 
    password 
}) => async dispatch => {
    // send headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    avatar.toString().replace("/^C:\\fakepath\\$/","");
    // prep data to send
    const body = JSON.stringify({ 
        name, 
        email, 
        avatar, 
        password 
    });

    try {
        const res = await axios.post('/api/users', body, config);
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            // show alert for each error
            // loop thru errors
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }

};

// Login user
export const login = (email, password) => async dispatch => {
    // send headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // prep data to send
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        // so it runs immediately
        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            // show alert for each error
            // loop thru errors
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }

};

// Logout / clear profile
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    dispatch({ type: LOGOUT });
    window.location.reload(false);
}
