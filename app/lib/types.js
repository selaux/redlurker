import { PropTypes } from 'react';

export const subredditType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string.isRequired
});

export const postType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    subreddit: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    hint: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
});
