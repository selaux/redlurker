import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Navbar, Nav, Glyphicon } from 'react-bootstrap';

import TitleBar from '../../../../../app/components/common/TitleBar';

describe('TitleBar Component', function () {
    it('should render a fixed fluid navbar', function () {
        const titleBar = shallow(<TitleBar loading={false} />);
        const navbar = titleBar.find(Navbar);

        expect(navbar).to.be.present();
        expect(navbar).to.have.prop('fluid', true);
        expect(navbar).to.have.prop('fixedTop', true);
    });

    it('should render a nav with children', function () {
        const titleBar = shallow(<TitleBar loading={false}><span id='some-id'/></TitleBar>);
        const nav = titleBar.find(Navbar).find(Nav).find(Navbar.Text);

        expect(nav).to.be.present();
        expect(nav.find('span')).to.have.prop('id', 'some-id');
    });

    describe('loading indicator', function () {
        it('should be present when loading', function () {
            const titleBar = shallow(<TitleBar loading={true} />);
            const loadingNav = titleBar.find(Navbar).find(Nav).at(1);

            expect(loadingNav).to.be.present();
            expect(loadingNav.find(Navbar.Text).find(Glyphicon)).to.have.prop('glyph', 'refresh');
        });

        it('should NOT be present when NOT loading', function () {
            const titleBar = shallow(<TitleBar loading={false} />);
            const nav = titleBar.find(Navbar).find(Nav);

            expect(nav).to.have.length(1);
        });
    });
});
