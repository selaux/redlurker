import R from 'ramda';

import { getSubreddits } from './common';
import { REQUEST_STARTED, RECEIVE_POPULAR_SUBREDDITS, REQUEST_FINISHED, REQUEST_ERROR } from '../../constants';

export default function fetchPopularSubreddits(context) {
    return (dispatch) => {
        dispatch({ type: REQUEST_STARTED });

        return context.fetch('https://api.reddit.com/subreddits/popular')
            .then(R.invoker(0, 'json'))
            .then((response) => {
                const data = getSubreddits(response);

                dispatch({ type: RECEIVE_POPULAR_SUBREDDITS, subreddits: data });
                dispatch({ type: REQUEST_FINISHED });
            }, (err) => dispatch({ type: REQUEST_ERROR, errorMessage: err.toString() }));
    };
}
