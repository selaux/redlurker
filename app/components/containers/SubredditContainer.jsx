import React from 'react'
import R from 'ramda';
import {connect} from 'react-redux'
import classNames from 'classnames';

import fetchSubreddit from '../../actions/reddit/fetchSubreddit'
import Subreddit from '../common/Subreddit'
import SubredditTitleBar from '../common/SubredditTitleBar'

export class SubredditPage extends React.Component {
    componentDidMount() {
        this.props.fetchSubreddit(this.context, this.props.params.subreddit);
    }

    render() {
        const { loading, subreddits, fetchSubreddit } = this.props;
        const subredditProps = {
            loading,
            name: this.props.params.subreddit,
            posts: subreddits[this.props.params.subreddit],
            fetchSubreddit,
            className: classNames({
                'with-post': !!this.props.children
            })
        };

        return (
            <div>
                <SubredditTitleBar loading={loading} title={`/r/${this.props.params.subreddit}`} />
                <div className='content-container'>
                    {this.props.children}
                    <Subreddit {...subredditProps} />
                </div>
            </div>
        );
    }
}

SubredditPage.propTypes = {
    loading: React.PropTypes.bool.isRequired,
    subreddits: React.PropTypes.object.isRequired
};

SubredditPage.contextTypes = {
    fetch: React.PropTypes.func
};

export default connect(
    state => ({
        loading: R.path([ 'request', 'inProgress' ], state),
        subreddits: R.path([ 'subreddits', 'posts' ], state)
    }),
    { fetchSubreddit }
)(SubredditPage)