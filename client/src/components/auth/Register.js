import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
// changed pt import to fix bug
import {PropTypes as propTypes} from 'prop-types';


// destructured setAlert from the props thats possible via the connect pkg
const Register = ({ setAlert }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        // make sure passwords match
        if (password !== password2) {
            // SET ALERT to the props
            // * if you want you can add a timer to this cb by adding another arg in milliseconds after 'danger' *
            setAlert('passwords do not match', 'danger');
        } else {
            console.log('success!!!!')
            // THIS WILL BE DONE WITH REDUX
            // ============================
            // const newUser = {
            //     name,
            //     email,
            //     password
            // };
            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     };
            //     const body = JSON.stringify(newUser);

            //     const res = await axios.post('/api/users', body, config);
            //     console.log(res.data);
            // } catch (err) {
            //     console.error(err.response.data)
            // }
        }
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
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
                        value={email} 
                        onChange={e => onChange(e)}
                        required 
                    />
                    <small className="form-text">
                        This site uses gravatar so if you want a profile image, use an email that has an image icon uploaded to it...you're welcome lol.
                    </small>
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        minLength="6"
                        value={password} 
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        placeholder="Confirm password"
                        name="password2"
                        minLength="6"
                        value={password2} 
                        onChange={e => onChange(e)}
                        required
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
    setAlert: propTypes.func.isRequired
}

// when you import an action you have to pass it to the connect cb that's being exported
//takes two args (any state you want to map) & an object with actions used
export default connect(null, { setAlert })(Register);