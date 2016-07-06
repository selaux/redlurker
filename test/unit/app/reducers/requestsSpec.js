import { expect } from 'chai';

import requests from '../../../../app/reducers/requests';
import { REQUEST_STARTED, REQUEST_FINISHED, REQUEST_ERROR } from '../../../../app/constants';

describe('requests reducer', function () {
    it('should have the correct initial state', function () {
        expect(requests(undefined, {})).to.deep.equal({ inProgress: false, error: null });
    });

    it('should update when a request has been started', function () {
        expect(requests({ inProgress: false }, { type: REQUEST_STARTED })).to.deep.equal({ inProgress: true });
    });

    it('should update when a request has been finished successfully', function () {
        expect(requests({ inProgress: true }, { type: REQUEST_FINISHED })).to.deep.equal({ inProgress: false });
    });

    it('should update when a request has been finished successfully', function () {
        const initialState = { inProgress: true, error: null };
        const action = { type: REQUEST_ERROR, errorMessage: 'Foo Bar' };

        expect(requests(initialState, action)).to.deep.equal({ inProgress: false, error: 'Foo Bar' });
    });
});
