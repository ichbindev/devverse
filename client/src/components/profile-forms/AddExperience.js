import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { PropTypes as propTypes } from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from'../../actions/profile'

const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    // Desctructure to use as expressions
    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Add Your Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch" />
                Add any past work xperiences you may hold now, or in the past.
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* Job Title" 
                        name="title" 
                        value={title} 
                        onChange={e => onChange(e)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="* Company" 
                        name="company" 
                        value={company} 
                        onChange={e => onChange(e)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                        placeholder="Location" 
                        name="location" 
                        value={location} 
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <h4>From Date:</h4>
                    <input 
                        type="date" 
                        name="from" 
                        value={from} 
                        onChange={e => onChange(e)} 
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input 
                            type="checkbox" 
                            name="current"
                            checked={current} 
                            value={current} 
                            onChange={e => {
                                setFormData({ ...formData, current: !current });
                                toggleDisabled(!toDateDisabled);
                            }} 
                        />
                        {' '}Current Job 
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date:</h4>
                    <input 
                        type="date" 
                        name="to" 
                        value={to} 
                        onChange={e => onChange(e)}
                        disabled={toDateDisabled ? 'disabled' : ''} 
                    />
                </div>
                <div className="form-group">
                    <textarea 
                        name="description" 
                        cols="30" 
                        rows="5"
                        placeholder="Job Decription"
                        value={description}
                        onChange={e => onChange(e)}></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <Link to="/dashboard" className="btn btn-light my-1">Go Back!</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: propTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience));
