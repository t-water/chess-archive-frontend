import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import Spinner from './SpinnerComponent'

function RenderPlayerCard({player}){
	return(
		<Card className = "mb-3">
			<CardBody>
				<h3 className="card-title">{player.FullName}</h3>
				<CardText><strong>Country: </strong>{player.Country}</CardText>
				<CardText><strong>Born: </strong>{player.BirthDate.replace(/T00:00:00/, "")}</CardText>
				{player.DeathDate !== null && <CardText><strong>Died: </strong>{player.DeathDate.replace(/T00:00:00/, "")}</CardText>}
				<CardText><a className="btn btn-primary" href={"/viewgames/" + player.PlayerId}>View Games</a></CardText>
			</CardBody>
		</Card>
	)
}

class BrowsePlayers extends Component{
	constructor(props){
		super(props)

		this.state = {
			players: [],
			sortOffset: 0,
			playerSearch: ''
		}

		this.handlePlayerSearch = this.handlePlayerSearch.bind(this)
	}

	componentDidMount(){
		fetch('/player/getPlayers', {
			method: 'GET'
		})
		.then(response => response.json())
		.then(response => {
			this.setState({
				players: response
			})
		})
	}

	handlePlayerSearch(e){
		this.setState({
			playerSearch: e.target.value
		}, () => {
			fetch('player/getPlayers/' + this.state.playerSearch.trim(), {
				method: 'GET'
			})
			.then(response => response.json())
			.then(response => {
				console.log(response)
				this.setState({
					players: response
				})
			})
		})

		
	}

	render(){
		let players = this.state.players.map(player => {
			return <div key={`${player.FullName} Card`}><RenderPlayerCard player = {player}/></div>
		})
		return(
			<div>
				<h1>Browse Players</h1>
				<div className="form-group">
					<label>Search Name: </label>
					<input className="form-control col-12 col-md-6" 
						   onChange={this.handlePlayerSearch}
						   value={this.state.playerSearch}/>
				</div>
				{this.state.players.length > 0 ? players : <Spinner/>}
				<div className="form-group text-center">
					<button className="btn btn-primary m-1">Previous Page</button>
					<button className="btn btn-primary m-1">Next Page</button>
				</div>

			</div>
		)
	}
}

export default BrowsePlayers;