import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Media } from 'react-bootstrap';

import SubredditListing from '../../../../../app/components/common/SubredditListing';

describe('SubredditListing Component', function () {
    const defaultSubreddit = {
        id: 'myId',
        url: '/r/mysubreddit',
        name: 'My Subreddit',
        thumbnail: 'https://my.subreddit.co/thumb.jpg',
        description: 'My very useful subreddit'
    };

    it('should render as a Listing', function () {
        const subreddit = shallow(<SubredditListing subreddit={defaultSubreddit} />);
        const listing = subreddit.find('Listing');

        expect(listing).to.be.present();
        expect(listing).to.have.prop('id', 'myId');
        expect(listing).to.have.prop('link', '/r/mysubreddit');
        expect(listing).to.have.prop('thumbnail', 'https://my.subreddit.co/thumb.jpg');
    });

    it('should render the subreddits name', function () {
        const subreddit = shallow(<SubredditListing subreddit={defaultSubreddit} />);
        const heading = subreddit.find('Listing').find(Media.Heading);

        expect(heading).to.be.present();
        expect(heading.children()).to.have.text('My Subreddit');
    });

    it('should render the subreddits description', function () {
        const subreddit = shallow(<SubredditListing subreddit={defaultSubreddit} />);
        const description = subreddit.find('Listing').find('p');

        expect(description).to.be.present();
        expect(description).to.have.text('My very useful subreddit');
    });
});
