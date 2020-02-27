import React, {Component} from 'react';
import '../styles/swiper.css'
import '../styles/LandingPage.css'


import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import Swiper from 'swiper'

const styles ={
	
	
	
}

class LandingPage extends Component {
	
	constructor (props) {
		super(props)
		this.state = { 
			movies: [],
			movieGenres: []
		}
		
		this.getGenres = this.getGenres.bind(this);
	}
	
	componentDidMount(){
		this.getUpcomingMovies();
		
	}
	
	async getUpcomingMovies() {
		let searchResults = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=e3eaa7d9a9306546e691ebb236b3feb0&language=en-US&page=1`);
		let genreResults = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=e3eaa7d9a9306546e691ebb236b3feb0&language=en-US`);
		
		this.setState({
			movies: [...searchResults.data.results], //get first 3 popular movies,
			movieGenres: [...genreResults.data.genres] //get the genre list
		})
	
	}
	
	getGenres = (genreID) => {
		const result = this.state.movieGenres.find( ({id}) => id === genreID )
		return result.name;
		
	}
	
	render(){
		
		(() => {
		const sliderEl = document.querySelector('.home-swiper-container');
		if(!sliderEl){
		return;
		}
		const slider = new Swiper(sliderEl, {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 0,
		observer: true,

		autoplay: {
		delay: 10000,
		},

		pagination: {
		el: '.home-swiper-pagination',
		type: 'progressbar',
		},
		navigation: {
		nextEl: '.home-swiper-button-next',
		prevEl: '.home-swiper-button-prev',
		}
		});
		})();
		
		const {movies} = this.state;
			
		return(
		
			<div className="home-swiper-container">
				<div className="home-swiper-pagination"></div>
				<div className="swiper-wrapper">
					{movies.filter((val, index) => index < 3).map(movie => (
						<Link to={`/movie/${movie.id}`} onClick={e => e.stopPropagation()} className="swiper-slide" style={{background: `linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%) center center no-repeat, url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) center top no-repeat`}}>
							<p className="swiper-slide__category">Now Playing</p>
							<h2 className="swiper-slide__title">{movie.title}</h2>
							<p className="swiper-slide__item-duration">{`${this.getGenres(movie.genre_ids[0])} || ${movie.vote_average}`}</p>
						</Link >
						))
					}
				</div>
				 
			</div>
		)
	}
}

export default withStyles(styles)(LandingPage);