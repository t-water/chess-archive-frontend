import React, {Component} from 'react';

class Contact extends Component{
	constructor(props){
		super(props)

		this.state = {
			email: '',
			emailName: 'Email',
			comment: '',
			commentName: 'Comment',
			response: ''
		}

		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		this.handleEmailInput = this.handleEmailInput.bind(this)
		this.handleCommentInput = this.handleCommentInput.bind(this)
	}

	handleFormSubmit(e){
		e.preventDefault();

		this.setState({
			response: ''
		})

		let formData = new FormData();
		formData.append(this.state.emailName, this.state.email)
		formData.append(this.state.commentName, this.state.comment)

		fetch('/feedback/add', {
			method: 'POST',
			body: formData
		})
		.then(response => {
			return response.json()
		}, err => {
			this.setState({
				response: 'Error Submitting Feedback. Please Try Again Later.'
			})
		})
		.catch(err => {
			this.setState({
				response: 'Error Submitting Feedback. Please Try Again Later.'
			})
		})
		.then(response => {
			this.setState({
				response: 'Thank You For Your Feedback!',
				email: '',
				comment: ''
			})
		}, err => {
			this.setState({
				response: 'Error Submitting Feedback. Please Try Again Later.'
			})
		})
		.catch(err => {
			this.setState({
				response: 'Error Submitting Feedback. Please Try Again Later.'
			})
		})
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
					<div className="form-group">
						<label>Email</label>
						<input className="form-control"
							   type="email"
							   onChange={this.handleEmailInput}
							   value={this.state.email}/>
					</div>
					<div className="form-group">
						<label>Comment</label>
						<textarea className="form-control" 
								  onChange={this.handleCommentInput}
								  value={this.state.comment}
								  rows="6"></textarea>
					</div>
					<div className="form-group">
						<button className="btn btn-primary"
								type="submit">
							Submit
						</button>
					</div>
					<div className="form-group">
						<span>{this.state.response}</span>
					</div>
				</form>
			</div>
		)
	}
}

export default Contact