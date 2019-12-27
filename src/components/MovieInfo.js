import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import axios from 'axios'

const styles = {
	
	// tester: ({ state }) => ({
	// 	backgroundImage: `'url(https://image.tmdb.org/t/p/original${state.backdrop})'`,
	// })

}

class MovieInfo extends Component  {
	
	constructor (props) {
		super(props)
		this.state = { 
			backdrop: '',
			poster: '',
			id: null,
			title: '',
			overview: '',
			genres: [],
			releaseDate: null
		
		}
	}
	
	  componentDidMount(){
			this.getMovieInfo(this.props.match.params.id)
	}

	
	async getMovieInfo(movieId) {
		let searchResults = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=e3eaa7d9a9306546e691ebb236b3feb0&language=en-US`)	
		this.setState({
			backdrop: searchResults.data.backdrop_path,
			poster: searchResults.data.poster_path,
			id: searchResults.data.id,
			title: searchResults.data.title,
			overview: searchResults.data.overview,
			genres: [...searchResults.data.genres], 
			releaseDate: searchResults.data.release_date
			})
	
	}
	render() {
		const {classes} = this.props;
		const { backdrop, poster, id, title, overview, genres, releaseDate} = this.state;
		
		return (
		<div className='container'>
			<div 
				className='row' 
				style={{cursor: 'pointer', paddingTop: '50px'}} 
			>
				<i className='fas fa-arrow-left'></i>
				<span style={{marginLeft: 10}}>Go back</span>
			</div>
			<div className='row'>
				<div className='col s12 m4'>
					{poster == null ?
						 <img src={`http://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt='missing movie' />
						:<div><img src={`https://image.tmdb.org/t/p/original${poster}`} alt='card' /> <img src={`https://image.tmdb.org/t/p/original${backdrop}`} alt='card' /> </div>
					}
				</div>
				<div className='col s12 m8'>
					<div className='info-container'>
						<p>{title}</p>
						{/*<p>{release_date.substring(5).split('-').concat(release_date.substring(0, 4)).join('/') }</p> */}
						<p>{overview}</p>
					</div>

				</div>
			</div>
			
		</div>
	)
	}
	
}

export default withStyles(styles)(MovieInfo);