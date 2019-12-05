import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});



class Nav extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			query: ''
		}
		
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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
	
	render(){
		const { classes } = this.props;
		return (
			
			<div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Film Quest
          </Typography>
          <div className={classes.search}>
						<form>
							<input
								placeholder="Search…"
								type='text' 
								name='query' 
								value={this.state.query} 
								onChange={this.handleChange}
								id='query'
							/>
							<Link to={`/movielist/${this.state.query}`} >
								<div className={classes.searchIcon}>
									<button type='submit'>
										<SearchIcon />
									</button>
								</div>
							</Link>
						</form>
          </div>
        </Toolbar>
      </AppBar>
    </div>
			
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