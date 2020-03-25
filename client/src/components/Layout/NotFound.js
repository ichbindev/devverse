import React from 'react';

const NotFound = () => {
    return (
        <>
            <h1 className="large text-primary">
                <i className="fas fa-exclamation-triangle" /> Page Not found
            </h1>
            <p className="large">Sorry, this page does not exist.<br/>Well, it does, because you're looking at it.<br/>However, you are not supposed to go here.</p>
            <small>Enjoy coneccting!</small>
        </>
    )
};

export default NotFound;