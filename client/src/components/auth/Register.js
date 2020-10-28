import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
// changed pt import to fix bug
import {PropTypes as propTypes} from 'prop-types';


// destructured setAlert from the props thats possible via the connect pkg
const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: '',
        password: '',
        password2: ''
    });

    const { 
        name, 
        email, 
        avatar, 
        password, 
        password2 
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        // make sure passwords match
        if (password !== password2) {
            // SET ALERT to the props
            // * if you want you can add a timer to this cb by adding another arg in milliseconds after 'danger' *
            setAlert('passwords do not match', 'danger');
        } else {
           register({ 
               name, 
               email, 
               avatar, 
               password });
        }
    };

    // If isAuthenicated
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"/> Create Your Account</p>
            <form 
                className="form" 
                onSubmit={e => onSubmit(e)} 
                >
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={name} 
                        onChange={e => onChange(e)} 
                        // required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
                        value={email} 
                        onChange={e => onChange(e)}
                        // required 
                    />
                <div className="form-group">
                    <input 
                        type="file" 
                        name="avatar" 
                        value={avatar} 
                        onChange={e => onChange(e)} 
                        // required 
                    />
                </div>
                    {/* <small className="form-text">
                        This site uses gravatar so if you want a profile image, use an email that has an image icon uploaded to it...you're welcome lol.
                    </small> */}
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        // minLength="6"
                        value={password} 
                        onChange={e => onChange(e)}
                        // required
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        placeholder="Confirm password"
                        name="password2"
                        // minLength="6"
                        value={password2} 
                        onChange={e => onChange(e)}
                        // required
                    />
                </div>
                <input 
                    type="submit" 
                    className="btn btn-primary" 
                    value="Register"
                />
            </form>
            <p className="my-1">
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    )
};

Register.propTypes = {
    setAlert: propTypes.func.isRequired,
    register: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

// when you import an action you have to pass it to the connect cb that's being exported
//takes two args (any state you want to map) & an object with actions used
export default connect(mapStateToProps, { setAlert, register })(Register);