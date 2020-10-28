import React, { Fragment } from 'react';
import spinner from './42.gif'

const Spinner = () => (
    <Fragment>
        <img 
            src={spinner}
            style={{
                width: '125px',
                margin: 'auto',
                display: 'block'
            }} 
            alt="Loading..."
        />
        
    </Fragment>
)
export default Spinner;