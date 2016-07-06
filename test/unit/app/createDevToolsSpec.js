import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import createDevTools from '../../../app/createDevTools';

describe('createDevTools', function () {
    it('should return a valid dev tools component', function () {
        const DevTools = createDevTools();
        const devTools = shallow(<DevTools />);

        expect(devTools).to.be.present();
    });

    it('should have an instrument method', function () {
        const DevTools = createDevTools();

        expect(DevTools.instrument).to.be.a('function');
    });
});
