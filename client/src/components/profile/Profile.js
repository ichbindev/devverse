import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes as propTypes } from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import { getProfileById } from '../../actions/profile';

const Profile = ({ 
    getProfileById, 
    profile: { profile, loading }, 
    auth, 
    match }) => { 

    useEffect(() => {
        // we get the id from the url
        getProfileById(match.params.id)
    }, [getProfileById]);


    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : <Fragment>
                <Link to='/profiles' className="btn btn-light">
                    Back to profiles list
                </Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id 
                && (<Link to='/edit-profile' className="btn btn-dark">Edit Profile</Link>)}
            </Fragment>}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: propTypes.func.isRequired,
    profile: propTypes.object.isRequired,
    auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
