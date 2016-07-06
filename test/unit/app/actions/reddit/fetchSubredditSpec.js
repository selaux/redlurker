import { expect } from 'chai';
import sinon from 'sinon';
import Promise from 'bluebird';

import { REQUEST_STARTED, REQUEST_FINISHED, REQUEST_ERROR, RECEIVE_SUBREDDIT } from '../../../../../app/constants';
import fetchSubreddit from '../../../../../app/actions/reddit/fetchSubreddit';

describe('fetchSubreddit action', function () {
    it('should fetch a subreddit from the reddit api and transform its response', function () {
        const data = {
            data: {
                children: [
                    {
                        data: {
                            id: 'someId',
                            author: 'someone',
                            domain: 'i.imgur.com',
                            subreddit: 'pics',
                            thumbnail: 'self',
                            post_hint: 'ph',
                            title: 'hello you!',
                            url: 'http://some.url'
                        }
                    },
                    {
                        data: {
                            id: 'someId2',
                            author: 'someoneElse',
                            domain: 'nsfw.me.com',
                            subreddit: 'nsfw',
                            thumbnail: 'nsfw',
                            post_hint: 'ph2',
                            title: 'nsfw!',
                            url: 'http://other.url'
                        }
                    }
                ]
            }
        };
        const fetchStub = sinon.stub().returns(Promise.resolve({ json: sinon.stub().returns(data) }));
        const dispatch = sinon.spy();

        return fetchSubreddit({ fetch: fetchStub }, 'ja2')(dispatch).then(function () {
            expect(fetchStub).to.have.been.calledOnce;
            expect(fetchStub).to.have.been.calledWith('https://api.reddit.com/r/ja2');

            expect(dispatch).to.have.callCount(3);
            expect(dispatch).to.have.been.calledWith({ type: REQUEST_STARTED });
            expect(dispatch).to.have.been.calledWith({
                type: RECEIVE_SUBREDDIT,
                subreddit: 'ja2',
                after: undefined,
                posts: [
                    {
                        id: 'someId',
                        author: 'someone',
                        domain: 'i.imgur.com',
                        subreddit: 'pics',
                        thumbnail: null,
                        hint: 'ph',
                        title: 'hello you!',
                        url: 'http://some.url'
                    },
                    {
                        id: 'someId2',
                        author: 'someoneElse',
                        domain: 'nsfw.me.com',
                        subreddit: 'nsfw',
                        thumbnail: 'nsfw',
                        hint: 'ph2',
                        title: 'nsfw!',
                        url: 'http://other.url'
                    }
                ]
            });
            expect(dispatch).to.have.been.calledWith({ type: REQUEST_FINISHED });
        });
    });

    it('should fetch post after another post correctly', function () {
        const data = {
            data: {
                children: []
            }
        };
        const after = { id: 'abc' };
        const count = 25;
        const fetchStub = sinon.stub().returns(Promise.resolve({ json: sinon.stub().returns(data) }));
        const dispatch = sinon.spy();

        return fetchSubreddit({ fetch: fetchStub }, 'b2', { after, count })(dispatch).then(function () {
            expect(fetchStub).to.have.been.calledOnce;
            expect(fetchStub).to.have.been.calledWith('https://api.reddit.com/r/b2?after=t3_abc&count=25');

            expect(dispatch).to.have.callCount(3);
            expect(dispatch).to.have.been.calledWithMatch({
                after
            });
        });
    });

    it('should report any errors', function () {
        const fetchStub = sinon.stub().returns(Promise.reject(new Error('Test Error')));
        const dispatch = sinon.spy();

        return fetchSubreddit({ fetch: fetchStub }, 'ja2')(dispatch).then(function () {
            expect(dispatch).to.have.callCount(2);
            expect(dispatch).to.have.been.calledWith({ type: REQUEST_STARTED });
            expect(dispatch).to.have.been.calledWith({ type: REQUEST_ERROR, errorMessage: 'Error: Test Error' });
        });
    });
});
