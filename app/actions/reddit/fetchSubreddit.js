import R from 'ramda';

import { getPosts } from './common';
import { REQUEST_STARTED, RECEIVE_SUBREDDIT, REQUEST_FINISHED, REQUEST_ERROR } from '../../constants';

const buildQueryParams = R.pipe(
    R.when(R.has('after'), (params) => R.assoc('after', `t3_${params.after.id}`, params)),
    R.toPairs,
    R.map(([ param, value ]) => `${encodeURIComponent(param)}=${encodeURIComponent(value)}`),
    R.join('&'),
    R.unless(R.isEmpty, (param) => `?${param}`)
);

export default function fetchSubreddit(context, name, params = {}) {
    return (dispatch) => {
        const queryParams = buildQueryParams(params);

        dispatch({ type: REQUEST_STARTED });

        return context.fetch(`https://api.reddit.com/r/${name}${queryParams}`)
            .then(R.invoker(0, 'json'))
            .then((response) => {
                const data = getPosts(response);

                dispatch({ type: RECEIVE_SUBREDDIT, subreddit: name, after: params.after, posts: data });
                dispatch({ type: REQUEST_FINISHED });
            }, (err) => dispatch({ type: REQUEST_ERROR, errorMessage: err.toString() }));
    };
}
