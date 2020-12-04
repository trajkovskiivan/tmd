import {actionTypes} from '../actions/config';

const movieReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_MOVIE:
            return action.payload;
        default:
            return state;
    }
}

export default movieReducer;