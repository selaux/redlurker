import React from 'react';
import R from 'ramda';
import Waypoint from 'react-waypoint';

import PostListing from './PostListing';
import renderIf from '../../lib/renderIf';
import {postType} from '../../lib/types';

function renderPosts(props, context) {
    const fetchParams = { after: R.last(props.posts), count: props.posts.length };
    const lazyLoad = () => props.fetchSubreddit(context, props.name, fetchParams);

    return (
        <div className={`subreddit ${props.className}`}>
            { props.posts.map((p) => <PostListing subreddit={props.name} key={p.id} post={p} />) }
            {renderIf(!props.loading, () => <Waypoint key='waypoint' onEnter={lazyLoad} threshold={2.0} />)}
        </div>
    )
}

export default function Subreddit(props, context) {
    return renderIf(props.posts, () => renderPosts(props, context), () => null);
}

Subreddit.propTypes = {
    name: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool.isRequired,
    posts: React.PropTypes.arrayOf(postType),
    fetchSubreddit: React.PropTypes.func
};

Subreddit.contextTypes = {
    fetch: React.PropTypes.func.isRequired
};