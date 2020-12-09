import React, {Component} from 'react';

import {connect} from 'react-redux';

import {fetchPopularData, fetchMovie} from '../actions';
import tmd from '../apis/tmd';

import Movie from './Movie';
import {api_key} from '../actions/config';

class MovieList extends Component {
    constructor() {
        super();
        this.state = {
            movie: '',
            debouncedMovie: '',
            timeoutId: null,
            movieDataResults: []
        }
        // this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMount ', this.props)
        this.props.fetchPopularData();
        // this.props.fetchMovie();
    }


    componentDidUpdate(prevProps, prevState) {
        // Here I made a timeout that refreshes every time I type in the input, if I don't type for 1s the timeout will finish and will make an API call to the server. This was tricky to do, and the way I managed to execute this, was by stating the timout as null in the state, and then I added a timeout to the variable.
        if (prevState.movie !== this.state.movie) {
            clearTimeout(this.state.timeoutId)
            this.setState({
                timeoutId: setTimeout(() => {
                    this.setState({debouncedMovie: this.state.movie})

                }, 1000)
            })
        }
        // This is where I check if there is a movie search, on not. 
        // TASK: make this api call through action!!!
        if (this.state.debouncedMovie && prevState.debouncedMovie !== this.state.debouncedMovie) {
            const search = async (title) => {
                const {data} = await tmd.get(`/search/movie?`, {
                    params: {
                        api_key: api_key,
                        query: title,
                        include_adult: false,
                        language: 'en'
                    }
                })
                console.log(data.results)
                this.setState({movieDataResults: data.results})
            }
            search(this.state.debouncedMovie);
            // console.log('Movie data Results   : ', this.state.movieDataResults)
        }
    }

    movieRenderer = () => {
        if (this.state.debouncedMovie && this.state.movieDataResults.length > 0) {
            return <div>We searched and got the data for movie and will show it</div>
        }
        if (this.state.debouncedMovie && this.state.movieDataResults.length === 0) {
            return <div>We searched and got the data for movie but there are no such movies in database</div>
        }
        return <div>Showing the popular data</div>
    }


    render() {
        console.log('render')
        return (
            <div>
                <h1>MovieList</h1>
                <form>
                    <label>Search for a movie</label> <br />
                    <input type='text' onChange={(event) => {this.setState({movie: event.target.value})}} />
                </form>
                <div>
                    {this.movieRenderer()}
                </div>
                <Movie />
            </div>
        );
    }
}

const mapStateToPops = (state) => {
    console.log('mapStateToProps ', state);
    return {
        popular: state.popularData.results,
        // movie: state.movieData.results
    }
}


export default connect(mapStateToPops, {fetchPopularData, fetchMovie})(MovieList);
