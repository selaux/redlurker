import R from 'ramda';

import { RECEIVE_SUBREDDIT, RECEIVE_POPULAR_SUBREDDITS, RECEIVE_MATCHING_SUBREDDITS } from '../constants';

const initialState = {
    posts: {},
    popular: [],
    matching: []
};

export default function subredditsReducer(state = initialState, action) {
    if (action.type === RECEIVE_SUBREDDIT) {
        if (action.after) {
            const id = action.after.id;
            const newPosts = R.pipe(
                R.dropLastWhile(R.complement(R.propEq('id', id))),
                R.concat(R.__, action.posts)
            )(state.posts[action.subreddit]);

            return R.assocPath([ 'posts', action.subreddit ], newPosts, state);
        }
        return R.assocPath([ 'posts', action.subreddit ], action.posts, state);
    }
    if (action.type === RECEIVE_POPULAR_SUBREDDITS) {
        return R.assoc('popular', action.subreddits, state);
    }
    if (action.type === RECEIVE_MATCHING_SUBREDDITS) {
        return R.assoc('matching', action.subreddits, state);
    }
    return state;
}
