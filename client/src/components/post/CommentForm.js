import React, { useState } from "react";
import { PropTypes as propTypes } from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {

    const [text, setText] = useState('');


  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          placeholder="let's start a thread!"
          cols="30"
          rows="5"
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1"/>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: propTypes.func.isRequired
};

// const mapStateToProps = state => ({});

export default connect(null, { addComment })(CommentForm);
