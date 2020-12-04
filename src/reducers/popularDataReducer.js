import {actionTypes} from '../actions/config';

const popularDataReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_POPULAR_DATA:
            return action.payload;
        default:
            return state;
    }
}

export default popularDataReducer;