import React, {Component} from 'react';

class Contact extends Component{
	constructor(props){
		super(props)

		this.state = {
			email: '',
			comment: ''
		}

		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleEmailInput = this.handleEmailInput.bind(this)
		this.handleCommentInput = this.handleCommentInput.bind(this)
	}

	handleFormSubmit(e){
		e.preventDefault();
	}

	handleEmailInput(e){
		this.setState({
			email: e.target.value
		})
	}

	handleCommentInput(e){
		this.setState({
			comment: e.target.value
		})
	}

	render(){
		return(
			<div>
				<h1>Contact Us</h1>
				<form onSubmit={this.handleFormSubmit}>
					<div class="form-group">
						<label>Email</label>
						<input className="form-control"
							   onChange={this.handleEmailInput}
							   value={this.state.email}/>
					</div>
					<div class="form-group">
						<label>Comment</label>
						<textarea className="form-control" 
								  onChange={this.handleCommentInput}
								  value={this.state.comment}
								  rows="6"></textarea>
					</div>
					<div class="form-group">
						<button className="btn btn-primary"
								type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Contact