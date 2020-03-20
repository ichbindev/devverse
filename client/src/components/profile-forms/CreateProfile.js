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

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    // destructure form fields from state to use as js expressions('variables')
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedIn,
        youtube,
        instagram
    } = formData;



    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">
                <i className="fas fa-user" /> The more info you give, the more you'll stand out!
            </p>
            <small>* = required field</small>
            <form className="form">
                {/* SELECT-DROPDOWN */}
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
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
                {/* COMPANY */}
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Could be one you work for, or your own company.
                    </small>
                </div>
                {/* WEBSITE */}
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Company URL (if applicable)
                    </small>
                </div>
                {/* LOCATION */}
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                    <small className="form-text">
                        City and State (suggested: e.g.: New York, NY)
                    </small>
                </div>
                {/* SKILLS */}
                <div className="form-group">
                    <input type="text" placeholder="Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Seperate your technology proficiencies with a comma.
                    </small>
                </div>
                {/* BIO */}
                <div className="form-group">
                    <input type="text" placeholder="Bio" name="bio" value={bio} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Tell us a little bit about yourself.
                    </small>
                </div>
                {/* -----ADD_SOCIAL----- */}
                <div className="my-2">
                    <button type='button' className='btn btn-light' onClick={() => toggleSocialInputs(!displaySocialInputs)}>
                        Add Social Network Accounts
                    </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs && <Fragment>
                {/* TWITTER */}
                <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x" />
                    <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
                </div>
                {/* FACEBOOK */}
                <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x" />
                    <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
                </div>
                {/* YOUTUBE */}
                <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x" />
                    <input type="text" placeholder="Youtube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
                </div>
                {/* LINKEDIN */}
                <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x" />
                    <input type="text" placeholder="LinkedIn URL" name="linkedin" value={linkedIn} onChange={e => onChange(e)} />
                </div>
                {/* INSTAGRAM */}
                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x" />
                    <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
                </div>
                    </Fragment>}

                
                <input type="submit" className="btn btn-primary my-1" />
                <a href="#" className="btn btn-light my-1">Go Back!</a>
            </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {

}

export default connect()(CreateProfile);
