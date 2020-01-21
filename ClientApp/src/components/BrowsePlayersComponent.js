import React, {Component} from 'react';
import { Card, CardText, CardBody } from 'reactstrap';

function RenderPlayers({players, isLoading, errMess}){
	if(isLoading){
		return <h4 className = "text-center">...Loading</h4>
	}else if(errMess){
		return <h4 className = "text-center">Unable to Load Players</h4>
	}else{
		if(players.length > 0){
			return players.map(p => {
				return(
					<div key={`${p.FullName} Card`}>
						<Card className = "mb-3">
							<CardBody>
								<h3 className="card-title">{p.FullName}</h3>
								<CardText><strong>Country: </strong>{p.Country}</CardText>
								<CardText><strong>Born: </strong>{p.BirthDate.replace(/T00:00:00/, "")}</CardText>
								{p.DeathDate !== null && <CardText><strong>Died: </strong>{p.DeathDate.replace(/T00:00:00/, "")}</CardText>}
								<CardText><a className="btn btn-primary" href={"/viewgames/" + p.PlayerId}>View Games</a></CardText>
							</CardBody>
						</Card>
					</div>
				)
			})
		}else{
			return <h4 className="text-center">No Players Found</h4>
		}
	}
}

class BrowsePlayers extends Component{
	constructor(props){
		super(props)

		this.state = {
			playerSearch: '',
			sortOffset: 0
		}

		this.pageForward = this.pageForward.bind(this)
		this.pageBackward = this.pageBackward.bind(this)
		this.handleInput = this.handleInput.bind(this)
	}

	pageForward(){
		let playerCount = this.props.players.filter(p => p.FullName.toLowerCase().includes(this.state.playerSearch.toLowerCase())).length
		if(this.state.sortOffset + 10 <= playerCount - 1){
			this.setState((state, props) => ({
				sortOffset: state.sortOffset + 10
			}))
		}
	}

	pageBackward(){
		if(this.state.sortOffset - 10 > 0){
			this.setState((state, props) => ({
				sortOffset: state.sortOffset - 10
			}))
		}else{
			this.setState({
				sortOffset: 0
			})
		}
	}

	handleInput(e){
		this.setState({
			playerSearch: e.target.value
		})
	}
	
	render(){
		let players = this.props.players.filter(p => p.FullName.toLowerCase().includes(this.state.playerSearch.toLowerCase()))
									.slice(this.state.sortOffset, this.state.sortOffset + 10);
		 
		return(
			<div>
				<h1>Browse Players</h1>
				<div className="form-group mb-1">
					<label>Search By Name: </label>
					<input className="form-control col-12 col-md-6" 
											   value={this.state.playerSearch}
											   onChange={this.handleInput}/>
				</div>
				<div className="form-group">
					<button className="btn btn-primary"
							onClick={this.handlePlayerSearch}>
						Submit
					</button>
				</div>
				<RenderPlayers players={players}
							 isLoading={this.props.isLoading}
							 errMess={this.props.errMess}/>
				<div className="form-group text-center">
					<button className="btn btn-primary m-1"
							onClick={this.pageBackward}>
						Previous Page
					</button>
					<button className="btn btn-primary m-1"
							onClick={this.pageForward}>
						Next Page
					</button>
				</div>
			</div>
		)
	}
}

export default BrowsePlayers