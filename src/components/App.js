import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Nav from './Nav';
// import SearchBox from './SearchBox'
import MovieList from './MovieList'
// import Pagination from './Pagination'
import MovieInfo from './MovieInfo'
import Movie from './Movie'
import LandingPage from './LandingPage'
import '../styles/App.css'


class App extends Component {
	
	
	
	render() {
		return (
			<div className='App'>
				<Switch>
					<Route 
						exact 
						path='/movielist/:name/page/:number' 
						render={ routeProps => <div> <Nav /> <MovieList {...routeProps} /> </div>}
					/>
					<Route 
						exact 
						path='/movie/:id' 
						render={ routeProps => <div> <Nav /> <MovieInfo {...routeProps} /> </div>}
					/>
					<Route
						exact
						path = '/'
						render ={() => <div> <Nav /> <LandingPage/> </div>}
					/>
				</Switch>				
			</div>
		)
	}
	
	
	/* constructor () {
		super()
		this.state = {
			movies: [],
			,
			totalResults: 0,
			currentPage: 1,
			currentMovie: null
		}
		this.apiKey = process.env.REACT_APP_API
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
		.then(data => data.json())
		.then(data => {
			console.log(data);
			this.setState({movies: [...data.results], totalResults: data.total_results})
		})
	}
	
	handleChange =(e) => {
		this.setState({searchTerm: e.target.value})
	}
	
	nextPage = (pageNumber) => {
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`)
		.then(data => data.json())
		.then(data => {
			console.log(data);
			this.setState({movies: [...data.results], currentPage: pageNumber})
		})
	}
	
	viewMovieInfo = (id) => {
		const filteredMovie = this.state.movies.filter(movie => movie.id ==id )
		
		const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null
		
		this.setState({currentMovie: newCurrentMovie})
	}
	
	closeMovieInfo =() => {
		this.setState({currentMovie: null})
	}
	
  render() {
		const numberPages = Math.floor(this.state.totalResults / 20);
    return (
			
      <div className="App">
        <Nav />
				{ 
					this.state.currentMovie == null ? 
					<div>
						<SearchBox handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
						<MovieList viewMovieInfo={this.viewMovieInfo}  movies={this.state.movies}/>
					</div>
					: <div><SearchBox handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
						<MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo} /></div>
				}
				
				{  <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/> }
      </div>
    );
  } */
} 

export default App;
