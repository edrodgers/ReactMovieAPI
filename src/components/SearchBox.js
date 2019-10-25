import React from 'react'

const SearchBox = (props) => {
	return (
		<div className='container' >
			<div className='row'>
				<section className='col s4 offset-s4'>
					<form action='' onSubmit={props.handleSubmit} >
						<div className='input-field'>
							<input placeholder='Begin Your Quest' type='text' onChange={props.handleChange}>
								
							</input>
						</div>
					</form>
				</section>
			</div>
		</div>
	)
}

export default SearchBox;