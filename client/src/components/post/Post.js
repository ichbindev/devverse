import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes as propTypes } from 'prop-types';
// connector for redux
import { connect } from 'react-redux';
// components
import Spinner from '../Layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
// action(s) for connect
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {

    useEffect(() => {
        getPost(match.params.id)
        // in video he didnt also pass the match params id like he did in profile
        // this is a marker comment to remind me if anything this i a spot to go back to
    }, [getPost, match.params.id])


    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to='/posts' className="btn">
            Back to Posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
    </Fragment>
}

Post.propTypes = {
    getPost: propTypes.func.isRequired,
    post: propTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
