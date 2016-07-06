import React from 'react';
import R from 'ramda';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import PostContainer, { PostPage } from '../../../../../app/components/containers/PostContainer';

describe('Post Container', function () {
    it('should render nothing if the subreddit cannot be found', function () {
        const props = {
            params: { postId: '1', subreddit: 'ne' },
            subreddits: { }
        };
        const postPage = shallow(<PostPage {...props} />);
        const post = postPage.find('Post');

        expect(post).not.to.be.present();
    });

    it('should render nothing if the post cannot be found', function () {
        const props = {
            params: { postId: '1', subreddit: 'ne' },
            subreddits: { ne: [] }
        };
        const postPage = shallow(<PostPage {...props} />);
        const post = postPage.find('Post');

        expect(post).not.to.be.present();
    });

    it('should render the post otherwise', function () {
        const postData = { id: '1' };
        const props = {
            params: { postId: '1', subreddit: 'ne' },
            subreddits: { ne: [ postData ] }
        };
        const postPage = shallow(<PostPage {...props} />);
        const post = postPage.find('.post').find('Post');

        expect(post).to.be.present();
        expect(post).to.have.prop('post', postData);
    });

    describe('store connection', function () {
        it('should map store to props correctly', function () {
            const state = {
                subreddits: { posts: { all: [] } }
            };
            const store = createStore(R.identity, state, applyMiddleware(thunkMiddleware));
            const homeContainer = shallow(<PostContainer store={store} />, { context });
            const home = homeContainer.find(PostPage);

            expect(home).to.have.prop('subreddits', state.subreddits.posts);
        });
    });
});
