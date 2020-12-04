import {combineReducers} from "redux";
import popularDataReducer from './popularDataReducer';
import movieReducer from './movieReducer';


export default combineReducers({
    popularData: popularDataReducer,
    movieData: movieReducer
})