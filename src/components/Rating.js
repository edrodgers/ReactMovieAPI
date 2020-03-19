import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
const animate = {
	
}
const styles = {
  circleWrap: {
  width: '80px',
  height: '80px',
  background: '#4c4c4c',
  borderRadius: '50%',
	padding: '6px',

},  
	
bgCircle: {
	borderRadius: '50%',
	background: '#2e3a0b',
	height: '100%',
},

circle: {
  
},

mask: {
  width: '80px',
  height: '80px',
  position: 'absolute',
  borderRadius: '50%',
	clip: 'rect(0px, 80px, 80px, 40px)',
},

fill: {
  width: '80px',
  height: '80px',
  position: 'absolute',
  borderRadius: '50%',
	clip: 'rect(0px, 40px, 80px, 0px)',
  backgroundColor: '#bcff29',
	transition: 'transform 2s',
},

full: {
  transition: 'transform 2s',
},

insideCircle: {
  background: '#4c4c4c',
	color: 'white',
	width: 70,
	height: 70,
	borderRadius: '50%',
	marginTop: 5,
	marginLeft: 5,
	position: 'absolute', 
	zIndex: 100,
	fontWeight: 700,
	fontSize: '1.3em',
	display: 'flex',
	justifyContent: 'center', 
	alignItems: 'center',
},
	
	animate: {
		transform: props => props.transform
	}
}

class Rating extends Component {
	
	constructor(props) {
		super(props)
		this.state = {loaded: false}
	}
	
	componentDidMount() {
		this.timerID = setTimeout(() => {
			this.setState ({loaded: true})
		}, 500)
		
	}

	render() {
		const {classes, transform, rotate} = this.props;
		const {loaded} = this.state;
		return (
			<div className={classes.circleWrap}>
				<div className={classes.bgCircle}>
					<div className={classes.circle}>

						<div className={`${classes.mask} ${classes.full} ${(loaded ? classes.animate : '')}`}>
							<div className={`${classes.fill} ${(loaded ? classes.animate : '')}` }></div>
						</div>
						<div className={classes.mask}>
							<div className={`${classes.fill} ${(loaded ? classes.animate : '')}` }></div>
						</div>
						<div className={classes.insideCircle}>
							{rotate}%
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Rating);