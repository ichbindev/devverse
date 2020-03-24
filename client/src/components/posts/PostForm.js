import React, { useState } from 'react';
import { PropTypes as propTypes } from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {

    // only one input field here so just need one empty string for state
    const [text, setText] = useState('');


    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say something...</h3>
            </div>
            <form 
                className="form my-1"
                onSubmit={e => {
                    e.preventDefault();
                    addPost({ text });
                    setText();
                    // i would gt a type error: 'cannot read statusText of undefined'
                    // BUT when i refresh the page the post loads
                    // adding window - location - reload cb it does that refresh for me
                    window.location.reload(false)
                }}>
                <textarea 
                    name="text"  
                    cols="30" 
                    rows="5"
                    value={text}
                    onChange={e => setText(e.target.value)}></textarea>
                <input type="submit" className="btn btn-dark my-1"/>    
            </form>
        </div>
    )
};

PostForm.propTypes = {
    addPost: propTypes.func.isRequired
};

//mapstatetoprops is for if you need to bring in state FROM REDUX
//this component has its own state!

export default connect(null, { addPost })(PostForm);
