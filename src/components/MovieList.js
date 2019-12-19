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
		let lastPage = this.state.currentPage > 5 ? Math.ceil(this.state.currentPage/5) * 5 : 5;
		let firstPage = lastPage - 4;
		
		
		for(let i = firstPage; i <= lastPage; i++ ) {
			let active = this.state.currentPage == i ? 'active' : '';
			
			pageLinks.push(
				<li 
					className={`pagination-item ${active}`} 
					key={i}
					onClick={() => this.nextPage(i)} k
				>
					<a href='#' >{i}</a>
				</li> )
		}
		
		return (
			<div className='MovieList-container'>
				
				<div className='MovieList'>
					{movies}
				</div>
				{
					(this.state.totalResults > 20) &&
					<div className='MovieList-pagination'>
						<div className='row'>
							<ul className='pagination'>
								{this.state.currentPage > 1 &&
									<li
										className={`pagination-item`} 
										onClick={() => this.nextPage(1)}
									>
										<a href='#' >First</a>
									</li>
								}
								{ this.state.currentPage > 1 && 
									
									<li 
										className={`pagination-item`} 
										onClick={() => this.nextPage(this.state.currentPage - 1)} 
									>
										<a href='#' >Prev</a>
									</li>
								}
								{pageLinks}
								{
									this.state.currentPage < numberPages + 1 && 
										<li 
											className={`pagination-item`} 
											onClick={() => this.nextPage(this.state.currentPage + 1)} 
										>
											<a href='#' >Next</a>
										</li>
										
								}
								{
									this.state.currentPage < numberPages + 1 &&
										<li 
											className={`pagination-item`} 
											onClick={() => this.nextPage(numberPages)} 
										>
											<a href='#' >Last</a>
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