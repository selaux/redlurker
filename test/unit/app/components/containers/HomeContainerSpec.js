import React from 'react';
import R from 'ramda';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import HomeContainer, { Home } from '../../../../../app/components/containers/HomeContainer';

describe('Home Container', function () {
    const defaultProps = {
        loading: true,
        subreddits: { all: [ { id: 'a' } ] },
        fetchSubreddit() {}
    };
    const context = { fetch() {} };

    it('should render a subreddit title bar', function () {
        const home = shallow(<Home {...defaultProps} />, { context });
        const titleBar = home.find('SubredditTitleBar');

        expect(titleBar).to.be.present();
        expect(titleBar).to.have.prop('loading', true);
        expect(titleBar).to.have.prop('title', '/r/all');
    });

    it('should render a div with the page content', function () {
        const home = shallow(<Home {...defaultProps} />, { context });
        const pageContainer = home.find('.content-container');

        expect(pageContainer).to.be.present();
    });

    it('should render the /r/all subreddit', function () {
        const home = shallow(<Home {...defaultProps} />, { context });
        const subreddit = home.find('.content-container').find('Subreddit');

        expect(subreddit).to.have.prop('loading', true);
        expect(subreddit).to.have.prop('name', 'all');
        expect(subreddit).to.have.prop('posts', defaultProps.subreddits.all);
        expect(subreddit).to.have.prop('fetchSubreddit', defaultProps.fetchSubreddit);
    });

    it('should render its children', function () {
        const home = shallow(<Home {...defaultProps}><span id='some-id' /></Home>, { context });
        const span = home.find('.content-container').find('span');

        expect(span).to.have.prop('id', 'some-id');
    });

    it('should fetch the /r/all data on first mount', function () {
        const props = R.merge(defaultProps, { fetchSubreddit: sinon.stub() });
        const home = shallow(<Home {...props} />, { context });

        home.instance().componentDidMount();

        expect(props.fetchSubreddit).to.have.been.calledOnce;
        expect(props.fetchSubreddit).to.have.been.calledWith(context, 'all');
    });

    describe('store connection', function () {
        it('should map store to props correctly', function () {
            const state = {
                request: { inProgress: false },
                subreddits: { posts: { all: [] } }
            };
            const store = createStore(R.identity, state, applyMiddleware(thunkMiddleware));
            const homeContainer = shallow(<HomeContainer store={store} />, { context });
            const home = homeContainer.find(Home);

            expect(home).to.have.prop('loading', false);
            expect(home).to.have.prop('subreddits', state.subreddits.posts);
            expect(home).to.have.prop('fetchSubreddit').that.is.a('function');
        });
    });
});
