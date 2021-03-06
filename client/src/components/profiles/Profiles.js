import React, { Fragment, useEffect } from 'react';
import { PropTypes as propTypes } from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            { loading ? <Spinner /> : <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop" /> Browse and connect with other developers!
                </p>
                <div className="profiles">
                    {/* loop thru profiles object and return each item */}
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    ) : <h4>No profiles found...</h4>}
                </div>
            </Fragment> }
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: propTypes.func.isRequired,
    profile: propTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
