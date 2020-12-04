import tmd from '../apis/tmd';
import {api_key, english, actionTypes} from './config';


export const fetchPopularData = () => async (dispatch) => {
    const response = await tmd.get('/movie/popular?', {
        params: {
            api_key: api_key,
            language: english,
            page: 1
        }
    })

    dispatch({type: actionTypes.FETCH_POPULAR_DATA, payload: response.data})
}


export const fetchMovie = (title) => async dispatch => {
    const response = await tmd.get('/search/movie?', {
        params: {
            api_key: api_key,
            query: title
        }
    })
    dispatch({type: actionTypes.FETCH_MOVIE, payload: response})
}