import React from 'react';
import R from 'ramda';
import {connect} from 'react-redux'

import Post from '../common/Post';

export class PostPage extends React.Component {
    render() {
        const postId = this.props.params.postId;
        const subreddit = this.props.params.subreddit;
        const post = R.pipe(
            R.prop(subreddit),
            R.defaultTo([]),
            R.find(R.propEq('id', postId))
        )(this.props.subreddits);

        if (post) {
            return (
                <div className='post'>
                    <Post post={post} />
                </div>
            );
        }
        return null;
    }
}

PostPage.propTypes = {
    params: React.PropTypes.object.isRequired,
    subreddits: React.PropTypes.object.isRequired
};

export default connect(
    state => ({
        subreddits: R.path([ 'subreddits', 'posts' ], state)
    })
)(PostPage)