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
		// 	var mySwiper = new Swiper ('.swiper-container', {
		// 	// Optional parameters
		// 	direction: 'vertical',
		// 	loop: true,

		// 	// If we need pagination
		// 	pagination: {
		// 		el: '.swiper-pagination',
		// 	},

		// 	// Navigation arrows
		// 	navigation: {
		// 		nextEl: '.swiper-button-next',
		// 		prevEl: '.swiper-button-prev',
		// 	},

		// 	// And if we need scrollbar
		// 	scrollbar: {
		// 		el: '.swiper-scrollbar',
		// 	},
		// })
		
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
		// const movieList = movies.filter((val, index) => index < 3).map(movie => (
		// 	<div className="swiper-slide">
		// 		<p className="now-playing">Now Playing</p>
		// 		<h2 className="now-playing-title">{movie.title}</h2>
		// 		<p>{`${this.getGenres(movie.genre_ids[0])} || ${movie.vote_average}`}</p>
		// 	</div>
		// 	))
			
			
			
		return(
			// <div class="swiper-container">
			// 		<div class="swiper-wrapper">
			// 				<div class="swiper-slide">Slide 1</div>
			// 				<div class="swiper-slide">Slide 2</div>
			// 				<div class="swiper-slide">Slide 3</div>
			// 		</div>
			// 		<div class="swiper-pagination"></div>

			// 		<div class="swiper-button-prev"></div>
			// 		<div class="swiper-button-next"></div>

			// 		<div class="swiper-scrollbar"></div>
			// </div>
			<div className="home-swiper-container">
				<div className="home-swiper-pagination"></div>
				<div className="swiper-wrapper">
					{movies.filter((val, index) => index < 3).map(movie => (
						<div className="swiper-slide">
							<p className="swiper-slide__category">Now Playing</p>
							<h2 className="swiper-slide__title">{movie.title}</h2>
							<p className="swiper-slide__item-duration">{`${this.getGenres(movie.genre_ids[0])} || ${movie.vote_average}`}</p>
						</div>
						))
					}
				</div>
				 
			</div>
		)
	}
}

export default withStyles(styles)(LandingPage);