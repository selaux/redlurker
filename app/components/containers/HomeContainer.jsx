import React from 'react'
import R from 'ramda';
import {connect} from 'react-redux'
import classNames from 'classnames';

import fetchSubreddit from '../../actions/reddit/fetchSubreddit'
import Subreddit from '../common/Subreddit'
import SubredditTitleBar from '../common/SubredditTitleBar'

export class Home extends React.Component {
    componentDidMount() {
        this.props.fetchSubreddit(this.context, 'all');
    }

    render() {
        const { loading, subreddits } = this.props;
        const subredditProps = {
            loading,
            name: 'all',
            posts: subreddits['all'],
            fetchSubreddit: this.props.fetchSubreddit,
            className: classNames({
                'with-post': !!this.props.children
            })
        };

        return (
            <div>
                <SubredditTitleBar loading={loading} title='/r/all' />
                <div className='content-container'>
                    {this.props.children}
                    <Subreddit {...subredditProps} />
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    loading: React.PropTypes.bool.isRequired,
    subreddits: React.PropTypes.object.isRequired,
    fetchSubreddit: React.PropTypes.func.isRequired
};

Home.contextTypes = {
    fetch: React.PropTypes.func
};

export default connect(
    state => ({
        loading: R.path([ 'request', 'inProgress' ], state),
        subreddits: R.path([ 'subreddits', 'posts' ], state)
    }),
    { fetchSubreddit }
)(Home)
