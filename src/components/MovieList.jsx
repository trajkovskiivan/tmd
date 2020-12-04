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

        if (prevState.movie !== this.state.movie) {
            clearTimeout(this.state.timeoutId)
            this.setState({
                timeoutId: setTimeout(() => {
                    this.setState({debouncedMovie: this.state.movie})

                }, 1000)
            })
        }
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



    render() {
        // console.log('This is from the render ', this.props)
        // console.log(this.state.movieDataResults && this.state.movieDataResults)
        // console.log(tmd)
        // console.log("This is from the render ", this.state.movieDataResults)
        // console.log('Debounced  ', this.state.debouncedMovie)
        return (
            <div>
                <h1>MovieList</h1>
                <form>
                    <label>Search for a movie</label> <br />
                    <input type='text' onChange={(event) => {this.setState({movie: event.target.value})}} />
                </form>
                {/* <h1>{this.state.movieDataResults.length > 0 ? 'I got it' : 'nah'}</h1> */}
                <div>
                    {
                        this.state.debouncedMovie ?
                            (<div>We searched and got the data for movie and will show it</div>)
                            :
                            (<div>Showing the popular data</div>)
                    }
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












        // if (prevState.movie !== this.state.movie) {
        //     let timerId = null
        //     clearTimeout(timerId)
        //     timerId = setTimeout(() => {
        //         this.setState({debouncedMovie: this.state.movie})
        //         console.log('First timer ', this.state.debouncedMovie)
        //     }, 1000);
        // }



        // if (prevState.movie !== this.state.movie) {
        //     console.log('Movie is changed: ', this.state.movie)
        //     const timerId = setTimeout(() => {
        //         this.setState({debouncedMovie: this.state.movie})
        //     }, 1000);
        //     if (this.state.movie !== this.state.debouncedMovie) {
        //         return () => clearTimeout(timerId)
        //     }

        // }
        // if (this.state.movie === this.state.debouncedMovie) {
        //     console.log('Debounced Movie changed', this.state.debouncedMovie)
        // }