import React from 'react';
import {Media} from 'react-bootstrap';

import Listing from './Listing'
import { postType } from '../../lib/types'

export default function PostListing(props) {
    const { subreddit, post } = props;

    return (
        <Listing id={post.id} link={`/r/${subreddit}/post/${post.id}`} thumbnail={post.thumbnail}>
            <Media.Heading>{post.title}<span>({post.domain})</span></Media.Heading>
            <p>{`/r/${post.subreddit}`}</p>
        </Listing>
    );
}

PostListing.propTypes = {
    subreddit: React.PropTypes.string.isRequired,
    post: postType
};