import React from 'react';

const Movie = (props) => {
	return (
		<div className='col s12 m6 l3'>
			<div className='card'>
				<div className='card-image waves-effect waves-block waves-light'>
					{props.image == null ?
						 <img src={`http://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt='missing movie' style={{width: '100%', height: '360px'}}/>
						:<img src={`https://image.tmdb.org/t/p/w185${props.image}`} alt='card' style={{width: '100%', height: '360px'}}/>
					}
				</div>
				<div className='card-content'>
					<p><a href='#' onClick={() => props.viewMovieInfo(props.movieId)} >View Details</a></p>
				</div>
			</div>
		</div>
	)
}

export default Movie;