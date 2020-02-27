import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
const animate = {
	
}
const styles = {
  circleWrap: {
  margin: '0 auto',
  width: 150,
  height: 150,
  background: '#4c4c4c',
  borderRadius: '50%',
	padding: '6px',

  
  // '& $circle': {
  //   '& $mask, $fill': {
  //     width: 150,
  //     height: '150px',
  //     position: 'absolute',
  //     borderRadius: '50%',
  //   },
    
  //   '& $mask': {
  //     clip: 'rect(0px, 150px, 150px, 75px)',
      
  //     '& $fill': {
  //       clip: 'rect(0px, 75px, 150px, 0px)',
  //       backgroundColor: '#bcff29',
  //     }
  //   },
  //   '& $mask$full, $fill': {
  //     animation: '$fill ease-in-out 3s',
  //     animationFillMode: 'forwards',
  //   }
  // },
  
  // '& $insideCircle': {
  //   background: '#4c4c4c',
  // color: 'white',
  //   width: 130,
  //   height: 130,
  //   borderRadius: '50%',
  //   marginTop: 10,
  //   marginLeft: 10,
  //   position: 'absolute', 
  //   zIndex: 100,
  //   fontWeight: 700,
  //   fontSize: '2em',
  //   display: 'flex',
  //   justifyContent: 'center', 
  //   alignItems: 'center',
  // }
},  

// '@keyframes fill':  {
//   from: {transform: 'rotate(0deg)'},
//   to: {transform:  props => (`rotate(${props.rotate}deg)`)},
// },
	
bgCircle: {
	borderRadius: '50%',
	background: '#2e3a0b',
	height: '100%',
},

circle: {
  
},

mask: {
  width: 150,
  height: '150px',
  position: 'absolute',
  borderRadius: '50%',
	clip: 'rect(0px, 150px, 150px, 75px)',
},

fill: {
  width: 150,
  height: '150px',
  position: 'absolute',
  borderRadius: '50%',
	clip: 'rect(0px, 75px, 150px, 0px)',
  backgroundColor: '#bcff29',
	transition: 'transform 3s',
},

full: {
  transition: 'transform 3s',
},

insideCircle: {
  background: '#4c4c4c',
	color: 'white',
	width: 130,
	height: 130,
	borderRadius: '50%',
	marginTop: 10,
	marginLeft: 10,
	position: 'absolute', 
	zIndex: 100,
	fontWeight: 700,
	fontSize: '2em',
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
		}, 1000)
		
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