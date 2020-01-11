import React, {Component} from 'react';

class Upload extends Component{
	constructor(props){
		super(props)
		this.handlePGNSubmit = this.handlePGNSubmit.bind(this)
	}

	async handlePGNSubmit(e) {
		e.preventDefault();
		let formData = new FormData();
		let input = document.getElementById('upload-component-pgn-textarea');
		formData.append(input.name, input.value)
		let response = await fetch('/pgn/UploadText', {
			method: 'POST',
			body: formData
		});
		let data = await response.json();
		console.log(data)
		if(data.hasOwnProperty("Error")){
			document.getElementById('pgn-error-span').innerText = data.Error
		}else{
			document.getElementById('pgn-error-span').innerText = 'no error'
			input.value = ""
		}
	}

	render(){
		return(
			<div className="row">
				<div className="col-12">
					<form onSubmit={this.handlePGNSubmit}
							  id="pgn-form"
							  method="post">
						<div className="form-group">
							<textarea id="upload-component-pgn-textarea"
								      className="form-control"
								      name="Pgn"
									  rows="5"
								      maxLength="5000">
							</textarea>
							<span className="text-danger"
								  id="pgn-error-span"></span>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary">Upload</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Upload