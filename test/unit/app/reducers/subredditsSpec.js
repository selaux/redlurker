import { expect } from 'chai';

import subreddits from '../../../../app/reducers/subreddits';
import { RECEIVE_SUBREDDIT, RECEIVE_MATCHING_SUBREDDITS, RECEIVE_POPULAR_SUBREDDITS } from '../../../../app/constants';

describe('subreddits reducer', function () {
    it('should have the correct initial state', function () {
        expect(subreddits(undefined, {})).to.deep.equal({ posts: {}, popular: [], matching: [] });
    });

    it('should update state when subreddit posts arrive', function () {
        const posts = [ { id: '123' }, { id: '456' } ];
        const action = { type: RECEIVE_SUBREDDIT, subreddit: 'some', posts };

        expect(subreddits({ a: 'b', posts: {} }, action)).to.deep.equal({
            a: 'b',
            posts: { some: posts }
        });
    });

    it('should update state when subreddit posts arrive that need to be inserted after a specific post', function () {
        const existingPosts = [ { id: '123' }, { id: '456' } ];
        const newPosts = [ { id: '789' }, { id: '101112' } ];
        const state = { a: 'b', posts: { some: existingPosts } };
        const action = { type: RECEIVE_SUBREDDIT, subreddit: 'some', after: existingPosts[0], posts: newPosts };

        expect(subreddits(state, action)).to.deep.equal({
            a: 'b',
            posts: {
                some: [
                    { id: '123' },
                    { id: '789' },
                    { id: '101112' }
                ]
            }
        });
    });

    it('should update state when popular subreddits arrive', function () {
        const popular = [ { id: 'a' }, { id: 'b' } ];
        const action = { type: RECEIVE_POPULAR_SUBREDDITS, subreddits: popular };

        expect(subreddits({}, action)).to.deep.equal({ popular });
    });

    it('should update state when matching subreddits arrive', function () {
        const matching = [ { id: 'a' }, { id: 'b' } ];
        const action = { type: RECEIVE_MATCHING_SUBREDDITS, subreddits: matching };

        expect(subreddits({ a: 'b' }, action)).to.deep.equal({ a: 'b', matching });
    });
});
