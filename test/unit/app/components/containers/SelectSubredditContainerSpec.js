import React from 'react';
import R from 'ramda';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SelectSubredditContainer, { SelectSubreddit } from '../../../../../app/components/containers/SelectSubredditContainer';

describe('SelectSubreddit Container', function () {
    const defaultProps = {
        loading: false,
        matchingSubreddits: [ { id: 'm1' }, { id: 'm2' } ],
        popularSubreddits: [ { id: 'p1' }, { id: 'p2' }, { id: 'p3' } ],
        fetchMatchingSubreddits() {},
        fetchPopularSubreddits() {}
    };
    const context = { fetch() {} };

    it('should render a title bar', function () {
        const selectSubreddit = shallow(<SelectSubreddit {...defaultProps} />, { context });
        const titleBar = selectSubreddit.find('TitleBar');

        expect(titleBar).to.be.present();
        expect(titleBar).to.have.prop('loading', false);
        expect(titleBar.children()).to.have.text('Choose Subreddit');
    });

    it('should render an input', function () {
        const selectSubreddit = shallow(<SelectSubreddit {...defaultProps} />, { context });
        const input = selectSubreddit.find('FormControl');

        expect(input).to.be.present();
        expect(input).to.have.prop('type', 'text');
        expect(input).to.have.prop('placeholder', 'Search for subreddit');
        expect(input).to.have.prop('value', '');
    });

    it('should render the popular subreddits when no search input is given', function () {
        const selectSubreddit = shallow(<SelectSubreddit {...defaultProps} />, { context });
        const subredditListItems = selectSubreddit.find('SubredditListing');

        expect(subredditListItems).to.have.length(3);
        expect(subredditListItems.at(0)).to.have.prop('subreddit', defaultProps.popularSubreddits[0]);
        expect(subredditListItems.at(1)).to.have.prop('subreddit', defaultProps.popularSubreddits[1]);
        expect(subredditListItems.at(2)).to.have.prop('subreddit', defaultProps.popularSubreddits[2]);
    });

    it('should fetch the popular subreddits on first mount', function () {
        const props = R.merge(defaultProps, { fetchPopularSubreddits: sinon.stub() });
        const selectSubreddit = shallow(<SelectSubreddit {...props} />, { context });

        selectSubreddit.instance().componentDidMount();

        expect(props.fetchPopularSubreddits).to.have.been.calledOnce;
        expect(props.fetchPopularSubreddits).to.have.been.calledWith(context);
    });

    describe('search', function () {
        it('should render the matching subreddits when search input is given', function () {
            const selectSubreddit = shallow(<SelectSubreddit {...defaultProps} />, { context });
            const input = selectSubreddit.find('FormControl');

            input.simulate('change', { target: { value: 'a' } });

            const subredditListItems = selectSubreddit.find('SubredditListing');

            expect(subredditListItems).to.have.length(2);
            expect(subredditListItems.at(0)).to.have.prop('subreddit', defaultProps.matchingSubreddits[0]);
            expect(subredditListItems.at(1)).to.have.prop('subreddit', defaultProps.matchingSubreddits[1]);
        });

        it('should not fetch matching subreddits immediately', sinon.test(function () {
            const props = R.merge(defaultProps, { fetchMatchingSubreddits: sinon.stub() });
            const selectSubreddit = shallow(<SelectSubreddit {...props} />, { context });
            const input = selectSubreddit.find('FormControl');

            input.simulate('change', { target: { value: 'a' } });

            expect(props.fetchMatchingSubreddits).not.to.have.been.called;
        }));

        it('should fetch matching subreddits after a second', sinon.test(function () {
            const props = R.merge(defaultProps, { fetchMatchingSubreddits: sinon.stub() });
            const selectSubreddit = shallow(<SelectSubreddit {...props} />, { context });
            const input = selectSubreddit.find('FormControl');

            input.simulate('change', { target: { value: 'a' } });

            this.clock.tick(1000);

            expect(props.fetchMatchingSubreddits).to.have.been.calledOnce;
            expect(props.fetchMatchingSubreddits).to.have.been.calledWith(context, 'a');
        }));
    });

    describe('store connection', function () {
        it('should map store to props correctly', function () {
            const state = {
                request: { inProgress: false },
                subreddits: { matching: 1, popular: 2 }
            };
            const store = createStore(R.identity, state, applyMiddleware(thunkMiddleware));
            const selectSubredditContainer = shallow(<SelectSubredditContainer store={store} />, { context });
            const selectSubreddit = selectSubredditContainer.find(SelectSubreddit);

            expect(selectSubreddit).to.have.prop('popularSubreddits', 2);
            expect(selectSubreddit).to.have.prop('matchingSubreddits', 1);
            expect(selectSubreddit).to.have.prop('fetchPopularSubreddits').that.is.a('function');
            expect(selectSubreddit).to.have.prop('fetchMatchingSubreddits').that.is.a('function');
        });
    });
});
