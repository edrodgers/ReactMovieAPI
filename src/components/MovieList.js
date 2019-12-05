import React, {Component} from 'react';
import axios from 'axios'
import Movie from './Movie'
import Nav from './Nav'
import '../styles/MovieList.css'


class MovieList extends Component {
	
	constructor (props) {
		super(props)
		this.state = { 
			movies: [],
			query: '',
			totalResults: 0,
			currentPage: 1
		
		}
		
		this.nextPage = this.nextPage.bind(this)
		
	}
	
	 async componentDidMount(){
		await this.searchMovies(this.props.match.params.name)
	}
	
	async componentDidUpdate(prevProps, prevState){
		 if (this.props.match.params.name !== prevProps.match.params.name) {
			await this.searchMovies(this.props.match.params.name)
		}
		
	}
	
	async searchMovies(searchQuery) {
		let searchResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=e3eaa7d9a9306546e691ebb236b3feb0&query=${searchQuery}`)	
		this.setState({
				movies: [...searchResults.data.results], 
				totalResults: searchResults.data.total_results,
				query: this.props.match.params.name,
				currentPage: 1
			})
	
	}

	
	nextPage = (pageNumber) => {
		fetch(`https://api.themoviedb.org/3/search/movie?api_key=e3eaa7d9a9306546e691ebb236b3feb0&query=${this.state.query}&page=${pageNumber}`)
		.then(data => data.json())
		.then(data => {
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
				<Nav />
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

export default MovieList;