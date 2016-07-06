import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import App from '../../../../app/components/App';

describe('App Component', function () {
    beforeEach(function () {
        global.fetch = sinon.stub();
    });

    afterEach(function () {
        delete global.fetch;
    });

    it('should render its children', sinon.test(function () {
        const app = shallow(<App><span id="test-id" /></App>);
        const span = app.find('span');

        expect(span).to.have.prop('id', 'test-id');
    }));

    it('should pass fetch as child context to its children', sinon.test(function () {
        const app = shallow(<App><span /></App>);
        const childContext = app.instance().getChildContext();

        childContext.fetch();

        expect(fetch).to.have.been.calledOnce;
        expect(fetch).to.have.been.calledOn(window);
    }));
});
