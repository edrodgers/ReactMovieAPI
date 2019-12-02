import React, {Component} from 'react'

class SearchBox extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchTerm: ''
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
		this.props.searchMovies(this.state.searchTerm)
	}
	
	render() {
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor='searchTerm' >Enter your film</label>
						<input 
							type='text' 
							name='searchTerm' 
							value={this.state.searchTerm} 
							onChange={this.handleChange}
							id='searchTerm'
						/>
					</div>
					<button>SEARCH!</button>
				</form>
			</div>
		)
	}
}

// const SearchBox = (props) => {
// 	return (
// 		<div className='container' >
// 			<div className='row'>
// 				<section className='col s4 offset-s4'>
// 					<form action='' onSubmit={props.handleSubmit} >
// 						<div className='input-field'>
// 							<input placeholder='Begin Your Quest' type='text' onChange={props.handleChange}>
								
// 							</input>
// 						</div>
// 					</form>
// 				</section>
// 			</div>
// 		</div>
// 	)
// }

export default SearchBox;