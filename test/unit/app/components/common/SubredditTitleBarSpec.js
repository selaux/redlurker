import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SubredditTitleBar from '../../../../../app/components/common/SubredditTitleBar';

describe('title bar', function () {
    const defaultProps = {
        loading: true,
        title: '/r/all'
    };

    it('should render with the correct loading indicator', function () {
        const subredditTitleBar = shallow(<SubredditTitleBar {...defaultProps} />);
        const titleBar = subredditTitleBar.find('TitleBar');

        expect(titleBar).to.be.present();
        expect(titleBar).to.have.prop('loading', true);
    });

    it('should render the /r/all subreddit name', function () {
        const subredditTitleBar = shallow(<SubredditTitleBar {...defaultProps} />);
        const titleBar = subredditTitleBar.find('TitleBar');

        expect(titleBar.children().at(0)).to.have.text('/r/all');
    });

    it('should render a link to change the subreddit', function () {
        const subredditTitleBar = shallow(<SubredditTitleBar {...defaultProps} />);
        const link = subredditTitleBar.find('TitleBar').find('Link');

        expect(link.children()).to.have.text('Change');
        expect(link).to.have.prop('to', '/select');
    });
});
