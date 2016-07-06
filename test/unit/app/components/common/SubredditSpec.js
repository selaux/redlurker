import React from 'react';
import R from 'ramda';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Subreddit from '../../../../../app/components/common/Subreddit';

function createPost(id) {
    return {
        id: `id${id}`,
        author: `auth${id}`,
        domain: `domain${id}`,
        subreddit: `sub${id}`,
        thumbnail: `thumb${id}`,
        hint: `hint${id}`,
        title: `title${id}`,
        url: `url${id}`
    };
}

describe('Subreddit Component', function () {
    const defaultProps = {
        name: 'mysr',
        loading: false,
        posts: [
            createPost(0),
            createPost(1)
        ],
        fetchSubreddit() {}
    };
    const context = { fetch() {} };

    it('should render nothing if no posts are passed', function () {
        const props = R.dissoc('posts', defaultProps);
        const subreddit = shallow(<Subreddit {...props} />, { context });

        expect(subreddit.children()).to.not.be.present();
    });

    it('should render all posts', function () {
        const subreddit = shallow(<Subreddit {...defaultProps} />, { context });
        const posts = subreddit.find('PostListing');

        expect(posts).to.have.length(2);
        expect(posts.at(0)).to.have.prop('subreddit', 'mysr');
        expect(posts.at(0)).to.have.prop('post', defaultProps.posts[0]);
        expect(posts.at(1)).to.have.prop('subreddit', 'mysr');
        expect(posts.at(1)).to.have.prop('post', defaultProps.posts[1]);
    });

    describe('infinite loading', function () {
        it('should render a waypoint that calls fetch while not loading', function () {
            const props = R.merge(defaultProps, { fetchSubreddit: sinon.stub() });
            const subreddit = shallow(<Subreddit {...props} />, { context });
            const waypoint = subreddit.find('Waypoint');

            expect(waypoint).to.be.present();

            waypoint.prop('onEnter')();

            expect(props.fetchSubreddit).to.have.been.calledOnce;
            expect(props.fetchSubreddit).to.have.been.calledWithMatch(context, 'mysr', { after: defaultProps.posts[1] });
        });

        it('should NOT render a waypoint while loading', function () {
            const props = R.merge(defaultProps, { loading: true });
            const subreddit = shallow(<Subreddit {...props} />, { context });
            const waypoint = subreddit.find('Waypoint');

            expect(waypoint).not.to.be.present();
        });
    });
});
