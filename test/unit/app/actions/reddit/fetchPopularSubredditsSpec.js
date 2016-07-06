import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

import { REQUEST_STARTED, REQUEST_FINISHED, REQUEST_ERROR,
         RECEIVE_POPULAR_SUBREDDITS } from '../../../../../app/constants';
import fetchPopularSubreddits from '../../../../../app/actions/reddit/fetchPopularSubreddits';
import subredditsData from './subredditsData';

describe('fetchPopularSubreddits action', function () {
    it('should fetch the popular subreddits from the reddit api and transform the response', function () {
        const { apiData, expected } = subredditsData;
        const fetchStub = sinon.stub().returns(Promise.resolve({ json: sinon.stub().returns(apiData) }));
        const dispatch = sinon.spy();

        return fetchPopularSubreddits({ fetch: fetchStub })(dispatch).then(function () {
            expect(fetchStub).to.have.been.calledOnce;
            expect(fetchStub).to.have.been.calledWith('https://api.reddit.com/subreddits/popular');

            expect(dispatch).to.have.callCount(3);
            expect(dispatch).to.have.been.calledWith({ type: REQUEST_STARTED });
            expect(dispatch).to.have.been.calledWith({
                type: RECEIVE_POPULAR_SUBREDDITS,
                subreddits: expected
            });
            expect(dispatch).to.have.been.calledWith({ type: REQUEST_FINISHED });
        });
    });

    it('should report any errors', function () {
        const fetchStub = sinon.stub().returns(Promise.reject(new Error('An Error')));
        const dispatch = sinon.spy();

        return fetchPopularSubreddits({ fetch: fetchStub })(dispatch).then(function () {
            expect(dispatch).to.have.callCount(2);
            expect(dispatch).to.have.been.calledWith({ type: REQUEST_STARTED });
            expect(dispatch).to.have.been.calledWith({ type: REQUEST_ERROR, errorMessage: 'Error: An Error' });
        });
    });
});
