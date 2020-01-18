import React, {Component} from 'react';
import SERVER_BASE_URL from '../shared/ServerBaseUrl';

function RenderPlayersTable({players}){
	let rows = players.map((player,i) => {
		return <tr key={`row ${i}`}><td>{player.FullName}</td><td><a href={"/viewgames/" + player.PlayerId}>View Games</a></td></tr>
	})

	return(
		<div className="table-responsive">
			<table className="table table-striped mb-5">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">View Games</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		</div>
	)
}

function RenderGamesTable({games}){
	let rows = games.map((game, i) => {
		return <tr key={`row ${i}`}><td>{game.Event}</td><td>{game.Round}</td><td><a href={"/game/" + game.Id}>View Game</a></td></tr>
	})

	return(
		<div className="table-responsive">
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Event</th>
						<th scope="col">Round</th>
						<th scope="col">View Game</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		</div>
	)
}

class Home extends Component{
	constructor(props){
		super(props)
		this.state = {
			featuredPlayers: [],
			featuredGames: []
		}
	}

	componentDidMount(){
		fetch(SERVER_BASE_URL + '/player/getfeaturedplayers', {
			method: 'GET',
			mode: 'cors'
		})
		.then(response => {
			return response.json()
		}, err => console.log(err))
		.catch(err => console.log(err))
		.then(response => {
			if(response){
				this.setState({
					featuredPlayers: response
				})
			}
		}, err => console.log(err))
		.catch(err => console.log(err))

		fetch(SERVER_BASE_URL + '/pgn/getfeaturedgames', {
			method: 'GET',
			mode: 'cors'
		})
		.then(response => {
			return response.json()
		}, err => console.log(err))
		.catch(err => console.log(err))
		.then(response => {
			if(response){
				this.setState({
					featuredGames: response
				})
			}
		}, err => console.log(err))
		.catch(err => console.log(err))
	}

	render(){
		let players = <RenderPlayersTable players={this.state.featuredPlayers}/>
		let games = <RenderGamesTable games={this.state.featuredGames}/>

		return(
			<div>
				<h1 className="mb-5">Welcome to the Chess Archive</h1>
				<h2 className="text-center">Featured Players</h2>
					{this.state.featuredPlayers.length > 0 && players}
				<h2 className="text-center">Featured Games</h2>
					{this.state.featuredGames.length > 0 && games}
			</div>
		)
	}
}

export default Home