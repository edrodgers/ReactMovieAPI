import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/styles';

const styles = {
	navContainer: {
		backgroundColor: '#4c4c4c',
		overflow: 'hidden',
		height: '100px',
		width: '100%',
		zIndex: '1',
	},
	
	navContainerInner:{
		position: 'relative',
		display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '0 auto',
	},
	
	homeButtonContainer: {
		padding: '20px',
		
	},
	
	homeButton: {
		color: '#E8E8E8',
		fontSize: '40px',
		textDecoration: 'none'
	},
	
	searchForm: {
		position: 'relative',
		height: '50px',
		width: '300px',
		margin: '20px',
		
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
		outline: '0',
		webkitTransition: 'width 0.4s ease-in-out, border-radius 0.8s ease-in-out, padding 0.2s',
		transition: 'width 0.4s ease-in-out, border-radius 0.8s ease-in-out, padding 0.2s',
		webkitTransitionDelay: '0.4s',
		transitionDelay:' 0.4s',
		float: 'right',
		position: 'absolute',
		right: '0',
		
	},
	
	searchFormButton:{
		background: 'none',
		position: 'absolute',
		top: '0px',
		right: '0',
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
		float: 'right',
		position: 'absolute',
		
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
				marginTop: '-1px',
				marginLeft: '-13px',
				cursor: 'pointer',
				webkitTransform: 'rotate(-45deg)',
				msTransform: 'rotate(-45deg)',
				transform: 'rotate(-45deg)',
			}
	},


	square: {
		width: '300px',
		borderRadius: '0',
		padding: '0 40px 0 10px',
		webkitTransition: 'width 0.4s ease-in-out, border-radius 0.4s ease-in-out, padding 0.2s',
		transition: 'width 0.4s ease-in-out, border-radius 0.4s ease-in-out, padding 0.2s',
		webkitTransitionDelay: '0.4s, 0s, 0.4s',
		transitionDelay: '0.4s, 0s, 0.4s',
		
		
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
		this.toggleBox = this.toggleBox.bind(this)
		
	}
	
	handleChange(evt){
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}
	
	toggleBox(evt) {
		evt.preventDefault();
		this.state.searchbox === false ?
			this.setState( {searchbox: true} )
			: this.setState( {searchbox: false} )

	}
	
	render(){
		const { classes } = this.props;
		const { searchbox } = this.state;
		
		return (
			
			<nav className={classes.navContainer}>
				<div className={classes.navContainerInner}>
					<div className={classes.homeButtonContainer}>
						<Link to='/' className={classes.homeButton}>
							Film Quest Testing
						</Link>
					</div>

					<form className={classes.searchForm}>
						<input
						className={ `${classes.searchFormInput} ${(searchbox ? classes.square : '')}`}
							placeholder= "Search…"
							type='text' 
							name='query' 
							value={this.state.query} 
							onChange={this.handleChange}
							id='query'
						/>
						<button type='reset' className={ `${classes.searchFormButton} ${(searchbox ? classes.close : '')}` } onClick={this.toggleBox}></button>
						<Link to={`/movielist/${this.state.query}/page/1`} >
							<button type='submit' className={classes.submitButton}>
							</button>
						</Link>
					</form>
				</div>
			</nav>
		)
	}
}

export default withStyles(styles)(Nav);