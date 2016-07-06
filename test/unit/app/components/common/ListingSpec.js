import React from 'react';
import R from 'ramda';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Media } from 'react-bootstrap';

import Listing from '../../../../../app/components/common/Listing';

describe('Listing Component', function () {
    const defaultProps = {
        id: 'myId',
        link: 'myLink'
    };

    it('should render as a Link', function () {
        const listing = shallow(<Listing {...defaultProps} />);
        const link = listing.find('Link');

        expect(link).to.be.present();
        expect(link.key()).to.equal('myId');
        expect(link).to.have.prop('to', 'myLink');
        expect(link).to.have.className('listing');
    });

    it('should render a media item inside the link', function () {
        const listing = shallow(<Listing {...defaultProps} />);
        const media = listing.find('Link').find(Media);

        expect(media).to.be.present();
    });

    it('should render a media body that contains the children', function () {
        const listing = shallow(<Listing {...defaultProps}><span id='some-span' /></Listing>);
        const mediaBody = listing.find('Link').find(Media).find(Media.Body);

        expect(mediaBody).to.be.present();
        expect(mediaBody.find('span')).to.have.prop('id', 'some-span');
    });

    describe('thumbnail', function () {
        it('should not be rendered if not passed', function () {
            const listing = shallow(<Listing {...defaultProps} />);
            const thumb = listing.find(Media.Left);

            expect(thumb).not.to.be.present();
        });

        it('should be rendered inside Media.Left if passed', function () {
            const props = R.merge(defaultProps, { thumbnail: 'https://myThumb' });
            const listing = shallow(<Listing {...props} />);
            const thumb = listing.find(Media.Left);

            expect(thumb).to.be.present();
        });

        it('should be rendered correctly', function () {
            const props = R.merge(defaultProps, { thumbnail: 'https://myThumb' });
            const listing = shallow(<Listing {...props} />);
            const thumb = listing.find(Media.Left).find('img');

            expect(thumb).to.be.present();
            expect(thumb).to.be.have.prop('width', 80);
            expect(thumb).to.be.have.prop('src', 'https://myThumb');
            expect(thumb).to.be.have.prop('alt', '');
        });
    });
});
