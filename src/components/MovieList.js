import React, {Component} from 'react';
import Movie from './Movie'
import SearchBox from './SearchBox'
import '../styles/MovieList.css'


class MovieList extends Component {
	
	constructor (props) {
		super(props)
		this.state = { 
			movies: [],
			searchTerm: '',
			totalResults: 0,
			currentPage: 1
		
		}
		
		this.searchMovies = this.searchMovies.bind(this)
		this.nextPage = this.nextPage.bind(this)
		
	}
	
	searchMovies(term){
		
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=e3eaa7d9a9306546e691ebb236b3feb0&query=${term}`)
		.then(data => data.json())
		.then(data => {
			console.log(data);
			this.setState({
				movies: [...data.results], 
				totalResults: data.total_results,
				searchTerm: term,
				currentPage: 1
			})
		})
	}
	
	nextPage = (pageNumber) => {
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=e3eaa7d9a9306546e691ebb236b3feb0&query=${this.state.searchTerm}&page=${pageNumber}`)
		.then(data => data.json())
		.then(data => {
			console.log(data);
			this.setState({movies: [...data.results], currentPage: pageNumber})
		})
	}
	
	render() {
		const movies = this.state.movies.map(movie => (
			<Movie 
				imagePath={movie.poster_path}
				movieId={movie.id}
				key={movie.id}
				title={movie.title}
			/>
		))
		
		const numberPages = Math.floor(this.state.totalResults / 20);
		const pageLinks = [];
		
		for(let i = 1; i <= numberPages +1; i++) {
			let active = this.state.currentPage == i ? 'active' : '';

			pageLinks.push(
				<li 
					className={`waves-effeect ${active}`} 
					key={i}
					onClick={() => this.nextPage(i)} 
				>
					<a href='#' >{i}</a>
				</li> )
		}
		
		return (
			<div className='MovieList'>
				<SearchBox searchMovies={this.searchMovies} />
				<div>
					{movies}
				</div>
				{
					(this.state.totalResults > 20) &&
					<div className='container'>
						<div className='row'>
							<ul className='pagination'>
								{this.state.currentPage > 1 && 
									<li 
										className={`waves-effeect`} 
										onClick={() => this.nextPage(this.state.currentPage - 1)} 
									>
										<a href='#' >Prev</a>
									</li>
								}
								{pageLinks}
								{
									this.state.currentPage < numberPages + 1 && 
										<li 
											className={`waves-effeect`} 
											onClick={() => this.nextPage(this.state.currentPage + 1)} 
										>
											<a href='#' >Next</a>
										</li>
								}
							</ul>
						</div>
					</div>
				}
				
				
			</div>
		)
	}
}

// const MovieList = (props) => {
// 	return (
// 		<div className="container">
// 		<div className='row'>
// 			<div className='col s12'>
// 				{props.movies.map((movie, i) => {
// 					return (
// 						<Movie 
// 							key={i} 
// 							viewMovieInfo={props.viewMovieInfo} 
// 							movieId={movie.id} 
// 							image={movie.poster_path}
// 						/>
// 					)
// 				})}
// 			</div>
// 		</div>
// 	</div>
// 	)
	
// }

export default MovieList;