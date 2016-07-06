import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Media } from 'react-bootstrap';

import PostListing from '../../../../../app/components/common/PostListing';

describe('PostListing Component', function () {
    const defaultPost = {
        id: 'pId',
        author: 'SomeOne',
        domain: 'i.imgur.com',
        subreddit: 'wow',
        thumbnail: 'https://foo.bar',
        title: 'Title',
        url: 'http://some.host/img.jpeg'
    };

    it('should render as a Listing', function () {
        const post = shallow(<PostListing subreddit='mysub' post={defaultPost} />);
        const listing = post.find('Listing');

        expect(listing).to.be.present();
        expect(listing).to.have.prop('id', 'pId');
        expect(listing).to.have.prop('link', '/r/mysub/post/pId');
        expect(listing).to.have.prop('thumbnail', 'https://foo.bar');
    });

    it('should render the posts title and host', function () {
        const post = shallow(<PostListing subreddit='mysub' post={defaultPost} />);
        const heading = post.find('Listing').find(Media.Heading);

        expect(heading).to.be.present();
        expect(heading.children().at(0)).to.have.text('Title');
        expect(heading.children().at(1)).to.have.text('(i.imgur.com)');
    });

    it('should render the subreddit name', function () {
        const post = shallow(<PostListing subreddit='mysub' post={defaultPost} />);
        const description = post.find('Listing').find('p');

        expect(description).to.be.present();
        expect(description).to.have.text('/r/wow');
    });
});
