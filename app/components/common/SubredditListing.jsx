import React from 'react';
import {Media} from 'react-bootstrap';

import Listing from './Listing'
import { subredditType } from '../../lib/types'

export default function SubredditListing(props) {
    const { subreddit } = props;

    return (
        <Listing id={subreddit.id} link={subreddit.url} thumbnail={subreddit.thumbnail}>
            <Media.Heading>{subreddit.name}</Media.Heading>
            <p>{subreddit.description}</p>
        </Listing>
    );
}

SubredditListing.propTypes = {
    subreddit: subredditType
};