import React, { Fragment, useState } from 'react';
import { PropTypes as propTypes } from 'prop-types';
import { connect } from 'react-redux';

const CreateProfile = props => {

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername:'',
        bio: '',
        twitter: '',
        facebook: '',
        linkedIn: '',
        youtube: '',
        instagram: ''
    });
    // destructure form fields from state to use as js expressions('variables')
    const {
        company,
        website,
        location,
        status,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedIn,
        youtube
    } = formData;


    return (
        <Fragment>
            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">
                <i className="fas fa-user" /> The more info you give, the more you'll stand out!
            </p>
            <small>* = required field</small>
            <form className="form">
                <div className="form-group">
                    <select name="status">
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student of Learning">Student of Learning</option>
                        <option value="Instructor">Instructor / Mentor / Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Where are you at in your career up to this point?
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" />
                    <small className="form-text">
                        Could be one you work for, or your own company.
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" />
                    <small className="form-text">
                        Company URL (if applicable)
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" />
                    <small className="form-text">
                        City and State (suggested: e.g.: New York, NY)
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Skills" name="skills" />
                    <small className="form-text">
                        Seperate your technology proficiencies with a comma.
                    </small>
                </div>
            </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {

}

export default connect()(CreateProfile);
