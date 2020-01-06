import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import axios from 'axios'

const styles = {
	
	// tester: ({ state }) => ({
	// 	backgroundImage: `'url(https://image.tmdb.org/t/p/original${state.backdrop})'`,
	// })
	
	innerContainer: {
		width: '1200px',
		margin: '0 auto',
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
		" & div" : {
			listStyle: 'none'
			}
	},

	cast: {
		paddingTop: '1em',
    paddingBottom: '1em',
	},
	
	card: {
		width: '15%',
    paddingRight: '2%',
	},
	
	cardImage: {
		width: '100px',
	},
	
	cardName: {
		fontSize: '17px',
    fontWeight: '600',
	},
	
	cardCharacter: {
		
	},

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
			cast: [...castResults.data.cast]
			})
	
	}
	render() {
		const {classes} = this.props;
		const { backdrop, poster, id, title, overview, genres, releaseDate, cast} = this.state;
		
		const fullGenre = genres.map(genre => (
			<span>{genre.name}</span>
		))
		
		const castList = cast.map(cast => (
			<div className={classes.card}>
				<img className={classes.cardImage} src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}/>
				<p className={classes.cardName}>{cast.name}</p>
				<p className={classes.cardCharacter}>{cast.character}</p>
			</div>
		)).filter((val, index) => index < 5)
		
		
		return (
		<div className='container'>
			<div className='background-header'>
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
									<div>{fullGenre}</div>
								</span>
								<p>{overview}</p>
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