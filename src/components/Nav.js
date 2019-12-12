import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
	navContainer: {
		backgroundColor: '#4c4c4c',
		overflow: 'hidden',
		position: 'relative',
		height: '100px'
	},
	
	homeButton: {
		color: '#E8E8E8',
	},
	
	searchForm: {
		position: 'absolute',
		height: '50px',
		width: '300px',
		marginLeft: '170px',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	
	searchFormInput: {
		boxSizing: 'border-box',
		width: '50px',
		height: '50px',
		border: '4px solid #ffffff',
		borderRadius: '50%',
		background: 'none',
		color: '#fff',
		fontSize: '16px',
		fontWeight: '400',
		fontFamily: 'Roboto',
		outline: '0',
		webkitTransition: 'width 0.4s ease-in-out, border-radius 0.8s ease-in-out, padding 0.2s',
		transition: 'width 0.4s ease-in-out, border-radius 0.8s ease-in-out, padding 0.2s',
		webkitTransitionDelay: '0.4s',
		transitionDelay:' 0.4s',
		webkitTransform: 'translate(-100%, -50%)',
		msTransform: 'translate(-100%, -50%)',
		transform: 'translate(-100%, -50%)',
		
	},
	
	searchFormButton:{
		background: 'none',
		position: 'absolute',
		top: '0px',
		left: '0',
		height: '50px',
		width: '50px',
		padding: '0',
		borderRadius: '100%',
		outline: '0',
		border: '0',
		color: 'inherit',
		cursor: 'pointer',
		webkitTransition: '0.2s ease-in-out',
		transition: '0.2s ease-in-out',
		webkitTransform: 'translate(-100%, -50%)',
		msTransform: 'translate(-100%, -50%)',
		transform: 'translate(-100%, -50%)',
		
		"&::before": {
			content: '""',
			position: 'absolute',
			width: '20px',
			height: '4px',
			backgroundColor: '#fff',
			webkitTransform: 'rotate(45deg)',
			msTransform: 'rotate(45deg)',
			transform: 'rotate(45deg)',
			marginTop: '26px',
			marginLeft: '17px',
			webkitTransition: '0.2s ease-in-out',
			transition: '0.2s ease-in-out',
		},
		
	},


	close: {
		webkitTransition: '0.4s ease-in-out',
		transition: '0.4s ease-in-out',
		webkitTransitionDelay: '0.4s',
		transitionDelay: '0.4s',
		
		"&::before": {
				content: '""',
				position: 'absolute',
				width: '27px',
				height: '4px',
				marginTop: '-1px',
				marginLeft: '-13px',
				backgroundColor: '#fff',
				webkitTransform: 'rotate(45deg)',
				msTransform: 'rotate(45deg)',
				transform: 'rotate(45deg)',
				webkitTransition:' 0.2s ease-in-out',
				transition: '0.2s ease-in-out',
			},
		"&::after": {
				content: '""',
				position: 'absolute',
				width: '27px',
				height: '4px',
				backgroundColor: '#fff',
				margiTtop: '-1px',
				marginLeft: '-13px',
				cursor: 'pointer',
				webkitTransform: 'rotate(-45deg)',
				msTransform: 'rotate(-45deg)',
				transform: 'rotate(-45deg)',
			}
	},


	square: {
		boxSizing: 'border-box',
		padding: '0 40px 0 10px',
		width: '300px',
		height: '50px',
		border: '4px solid #ffffff',
		borderRadius: '0',
		background: 'none',
		color: '#fff',
		fontFamily: 'Roboto',
		fontSize: '16px',
		fontWeight: '400',
		outline: '0',
		webkitTransition: 'width 0.4s ease-in-out, border-radius 0.4s ease-in-out, padding 0.2s',
		transition: 'width 0.4s ease-in-out, border-radius 0.4s ease-in-out, padding 0.2s',
		webkitTransitionDelay: '0.4s, 0s, 0.4s',
		transitionDelay: '0.4s, 0s, 0.4s',
		webkitTransform: 'translate(-100%, -50%)',
		msTransform: 'translate(-100%, -50%)',
		transform: 'translate(-100%, -50%)',
	},
	
	submitButton: {
		display: 'none'
	}


}



class Nav extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			query: '',
			searchbox: false
		}
		
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.toggleBox = this.toggleBox.bind(this)
		
	}
	
	handleChange(evt){
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}
	
	handleSubmit(evt) {
		evt.preventDefault();
		this.props.searchMovies(this.state.query)
	}
	
	toggleBox(evt) {
		evt.preventDefault();
		this.state.searchbox === false ?
			this.setState( {searchbox: true} )
			: this.setState( {searchbox: false} )

	}
	
// 	${this.state.searchbox && classes.close}
// ${this.state.searchbox && classes.square}	
	
	render(){
		const { classes } = this.props;
		
		return (
			
			<nav className={classes.navContainer}>
				<a className={classes.homeButton}>
					Film Quest
				</a>
				<form className={classes.searchForm}>
					<input
					className={ `${classes.searchFormInput} ${this.state.searchbox && classes.square}`}
						placeholder="Search…"
						type='text' 
						name='query' 
						value={this.state.query} 
						onChange={this.handleChange}
						id='query'
					/>
					<button type='reset' className={ `${classes.searchFormButton} ${this.state.searchbox && classes.close}` } onClick={this.toggleBox}></button>
					<Link to={`/movielist/${this.state.query}`} >
						<button type='submit' className={classes.submitButton}>
						</button>
					</Link>
				</form>
			</nav>
			
			// <nav>
			// 	<div className='nav-wrapper container'>
			// 		<a href='#' className='brand-logo'>Film Quest</a>
			// 	</div>
			// 	<div>
			// 	<form onSubmit={this.handleSubmit}>
			// 		<div>
			// 			<label htmlFor='query' >Enter your film</label>
			// 			<input 
			// 				type='text' 
			// 				name='query' 
			// 				value={this.state.query} 
			// 				onChange={this.handleChange}
			// 				id='query'
			// 			/>
			// 		</div>
			// 		<button>SEARCH!</button>
			// 	</form>
			// </div>
			// </nav>
			
			
		)
	}
}

export default withStyles(styles)(Nav);