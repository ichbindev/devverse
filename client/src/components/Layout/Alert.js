import React from 'react';
// changed pt import to fix bug
import {PropTypes as propTypes} from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => 
    alerts !== null && 
    alerts.length > 0 && 
    alerts.map(alert => (
        <div
            key={alert.id} 
            className={`alert alert-${alert.alertType}`}
        >
            { alert.msg }
        </div>
    ));

Alert.propTypes = {
    alerts: propTypes.array.isRequired
};

// we want the state
const mapStatetoProps = state => ({
    alerts: state.alert
});

export default connect(mapStatetoProps)(Alert);
