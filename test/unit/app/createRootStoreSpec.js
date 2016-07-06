import { expect } from 'chai';

import createRootStore from '../../../app/createRootStore';

describe('createRootStore', function () {
    it('should return a store initialized with the default values of all our reducers', function () {
        const store = createRootStore({ instrument() {} });
        const initialState = store.getState();

        expect(initialState).to.have.property('request').that.deep.equals({
            inProgress: false,
            error: null
        });
        expect(initialState).to.have.property('subreddits').that.deep.equals({
            posts: {},
            matching: [],
            popular: []
        });
    });
});
