import R from 'ramda';

import { REQUEST_STARTED, REQUEST_FINISHED, REQUEST_ERROR } from '../constants';

const initialState = {
    inProgress: false,
    error: null
};

export default function requestReducer(state = initialState, action) {
    if (action.type === REQUEST_STARTED) {
        return R.assoc('inProgress', true, state);
    }
    if (action.type === REQUEST_FINISHED) {
        return R.assoc('inProgress', false, state);
    }
    if (action.type === REQUEST_ERROR) {
        return { inProgress: false, error: action.errorMessage };
    }
    return state;
}
