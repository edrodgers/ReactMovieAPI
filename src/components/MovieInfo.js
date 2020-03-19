import React, {Component} from 'react';
import Rating from './Rating';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';

const styles = {
	
	// tester: ({ state }) => ({
	// 	backgroundImage: `'url(https://image.tmdb.org/t/p/original${state.backdrop})'`,
	// })
	
	innerContainer: {
		width: '1200px',
		margin: '0 auto',
	},
	
	backgroundHeader: {
		height: '92vh',
		width: 'auto'
	},

	row: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		paddingTop: '60px',
		margin: '0 auto',
	},

	infoContainer: {
		width: '800px',
		background: '#1d1d1de3',
    padding: '10px',
	},
	
	title: {
		paddingRight: '20px',
    fontSize: '3.5rem',
    margin: '0',
		display: 'inline-block',
	},
	
	date: {
		fontSize: '2em',
	},
	
	titleRow: {
		
	},
	
	castList: {
		paddingLeft: '0',
		paddingTop: '0',
		
	},

	cast: {
		paddingTop: '1em',
    paddingBottom: '1em',
		justifyContent: 'space-between'
	},
	
	card: {
		width: '15%',
    background: '#3c3c3c',
		borderBottom: '5px solid #302f2f',
    padding: '10px',
    borderRadius: '5px',	},
	
	cardImage: {
		width: '100%',
	},
	
	cardName: {
		fontSize: '17px',
    fontWeight: '600',
	},
	
	cardCharacter: {
		
	},
	
	nameContainer: {
	},
	
	stats: {
		paddingTop: '.5em',
    // fontSize: '1.3em',
    color: '#9e9e9e',
	},
	
	innerInfoContainer: {
		display: 'flex',
	},
	
	leftColumn: {
		width: '30%'
	},
	
	rightColumn: {
		width: '70%'
	}

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
			releaseDate: null,
			rating: '',
			cast: []
		
		}
	}
	
	  componentDidMount(){
			this.getMovieInfo(this.props.match.params.id)
	}

	
	async getMovieInfo(movieId) {
		let searchResults = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=e3eaa7d9a9306546e691ebb236b3feb0&language=en-US`)
		let castResults = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=e3eaa7d9a9306546e691ebb236b3feb0&language=en-US`)
		console.log(searchResults);
		console.log(castResults);
		this.setState({
			backdrop: searchResults.data.backdrop_path,
			poster: searchResults.data.poster_path,
			id: searchResults.data.id,
			title: searchResults.data.title,
			overview: searchResults.data.overview,
			genres: [...searchResults.data.genres], 
			releaseDate: searchResults.data.release_date.slice(0, 4),
			rating: searchResults.data.vote_average,
			cast: [...castResults.data.cast]
			})
	
	}
	render() {
		const {classes} = this.props;
		const { backdrop, poster, id, title, overview, genres, releaseDate, cast, rating} = this.state;
		let transform = `rotate(${Math.floor((rating*.1)*180)}deg)`
		
		const fullGenre = genres.filter((val, index) => index < 2).map(genre => genre.name).join(", ")
		
		const castList = cast.filter((val, index) => index < 5).map(cast => (
			<div className={classes.card}>
				<img className={classes.cardImage} src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}/>
				<div className={classes.nameContainer}>
					<p className={classes.cardName}>{cast.name}</p>
					<p className={classes.cardCharacter}>{cast.character}</p>
				</div>
			</div>
		))
			
		
		return (
		<div className='container'>
			<div className={classes.backgroundHeader} 
						style={{background: `linear-gradient(0deg, rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0.45) 92%) center center no-repeat, url(https://image.tmdb.org/t/p/original${backdrop}) center top no-repeat`}} >
				<div className='background-filter'>
					<div className={classes.innerContainer}>
						<div className={classes.row}>
							<div className='image-container'>
								{poster == null ?
									 <img src={`http://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt='missing movie' /> 
									:<img src={`https://image.tmdb.org/t/p/w300${poster}`} alt='card' />
								}
							</div>

							<div className={classes.infoContainer}>
								
								<span className={classes.titleRow}>
									<h1 className={classes.title}>{title}</h1> 
									<span className={classes.date}>({releaseDate})</span>
									
								</span>
								<div className={classes.innerInfoContainer}>
									<div className={classes.leftColumn}>
										<Rating transform={transform} rotate={rating*10}/>
										<div className={classes.stats}>
											<p>{`Genre: ${fullGenre}`}</p>
											<p>{`Average User Rating: ${rating}`}</p>
										</div>
									</div>
									<div className={classes.rightColumn}>
										<p>{overview}</p>
									</div>
									
									
								</div>
								
								<div className={`${classes.cast}` }>
									<h3>Cast</h3>
									<div className={`${classes.castList} ${classes.row}`}>
										{castList}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
	}
	
}

export default withStyles(styles)(MovieInfo);