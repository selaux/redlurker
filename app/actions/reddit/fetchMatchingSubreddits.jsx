import R from 'ramda';

import { getSubreddits } from './common';
import {REQUEST_STARTED, RECEIVE_MATCHING_SUBREDDITS, REQUEST_FINISHED, REQUEST_ERROR } from '../../constants'

export default function fetchMatchingSubreddits(context, searchString) {
    return dispatch => {
        const encodedSearchString = encodeURIComponent(searchString);

        dispatch({ type: REQUEST_STARTED });

        return context.fetch(`https://api.reddit.com/search?q=${encodedSearchString}&type=sr`).then(R.invoker(0, 'json')).then((response) => {
            const data = getSubreddits(response);

            dispatch({ type: RECEIVE_MATCHING_SUBREDDITS, subreddits: data });
            dispatch({ type: REQUEST_FINISHED });
        }, (err) => dispatch({ type: REQUEST_ERROR, errorMessage: err.toString() }));
    };
}
