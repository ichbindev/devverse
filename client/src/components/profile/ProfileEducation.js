import React from 'react';
import { PropTypes as propTypes } from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
    education: { school, degree, fieldOfStudy, current, to, from, description }
}) => {
    return (
        <div>
           <h3 className="text-dark">{school}</h3>
           <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
            </p>
            <p>
                <strong>Degree: </strong> {degree}
            </p>
            <p>
                <strong>Field Of Study: </strong> {fieldOfStudy}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p> 
        </div>
    )
}

ProfileEducation.propTypes = {
    education: propTypes.object.isRequired
}

export default ProfileEducation