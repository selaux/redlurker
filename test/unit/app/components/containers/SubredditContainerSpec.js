import React from 'react';
import R from 'ramda';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SubredditContainer, { SubredditPage } from '../../../../../app/components/containers/SubredditContainer';

describe('SubredditPage Container', function () {
    const defaultProps = {
        loading: false,
        params: { subreddit: 'test' },
        subreddits: { test: [ { id: 'a' } ] },
        fetchSubreddit() {}
    };
    const context = { fetch() {} };

    it('should render a subreddit title bar', function () {
        const subreddit = shallow(<SubredditPage {...defaultProps} />, { context });
        const titleBar = subreddit.find('SubredditTitleBar');

        expect(titleBar).to.be.present();
        expect(titleBar).to.have.prop('loading', false);
        expect(titleBar).to.have.prop('title', '/r/test');
    });

    it('should render a div with the page content', function () {
        const subredditPage = shallow(<SubredditPage {...defaultProps} />, { context });
        const pageContainer = subredditPage.find('.content-container');

        expect(pageContainer).to.be.present();
    });

    it('should render the correct subreddit', function () {
        const subredditPage = shallow(<SubredditPage {...defaultProps} />, { context });
        const subreddit = subredditPage.find('.content-container').find('Subreddit');

        expect(subreddit).to.have.prop('loading', false);
        expect(subreddit).to.have.prop('name', 'test');
        expect(subreddit).to.have.prop('posts', defaultProps.subreddits.test);
        expect(subreddit).to.have.prop('fetchSubreddit', defaultProps.fetchSubreddit);
    });

    it('should render its children', function () {
        const subreddit = shallow(<SubredditPage {...defaultProps}><span id='some-id' /></SubredditPage>, { context });
        const span = subreddit.find('.content-container').find('span');

        expect(span).to.have.prop('id', 'some-id');
    });

    it('should fetch the subreddits data on first mount', function () {
        const props = R.merge(defaultProps, { fetchSubreddit: sinon.stub() });
        const subreddit = shallow(<SubredditPage {...props} />, { context });

        subreddit.instance().componentDidMount();

        expect(props.fetchSubreddit).to.have.been.calledOnce;
        expect(props.fetchSubreddit).to.have.been.calledWith(context, 'test');
    });

    describe('store connection', function () {
        it('should map store to props correctly', function () {
            const state = {
                request: { inProgress: false },
                subreddits: { posts: { all: [] } }
            };
            const store = createStore(R.identity, state, applyMiddleware(thunkMiddleware));
            const container = shallow(<SubredditContainer store={store} />, { context });
            const subreddit = container.find(SubredditPage);

            expect(subreddit).to.have.prop('loading', false);
            expect(subreddit).to.have.prop('subreddits', state.subreddits.posts);
            expect(subreddit).to.have.prop('fetchSubreddit').that.is.a('function');
        });
    });
});
