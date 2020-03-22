import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { PropTypes as propTypes } from 'prop-types';
import { connect } from 'react-redux';
// action
import { createProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {

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

    useEffect(() => {
        getCurrentProfile();
        // also fill the form with the current values
        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.socialr ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedIn: loading || !profile.social ? '' : profile.social.linkedIn,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram
        });
    }, [loading, getCurrentProfile])

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
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">
                <i className="fas fa-user" /> The more info you give, the more you'll stand out!
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)} >
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
                {/* GITHUB */}
                <div className="form-group">
                    <input type="text" placeholder="Github Username" name="githubusername" value={githubusername} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Add your github to load your latest repos to your profile!
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
                    <input type="text" placeholder="LinkedIn URL" name="linkedIn" value={linkedIn} onChange={e => onChange(e)} />
                </div>
                {/* INSTAGRAM */}
                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x" />
                    <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
                </div>
                    </Fragment>}

                
                <input type="submit" className="btn btn-primary my-1" />
                <Link to="/dashboard" className="btn btn-light my-1">Go Back!</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: propTypes.func.isRequired,
    profile: propTypes.object.isRequired,
    getCurrentProfile: propTypes.func.isRequired,

}

const mapStateToProps = state => ({
    profile: state.profile
})

// withRouter wraps component so that we can access the history object in our action method
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
