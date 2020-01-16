import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

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
		
		this.handleInput = this.handleInput.bind(this)
		this.handlePlayerSearch = this.handlePlayerSearch.bind(this);
		this.pageForward = this.pageForward.bind(this);
		this.pageBackward = this.pageBackward.bind(this);
	}

	componentDidMount(){
		fetch('/player/getPlayers', {
			method: 'GET'
		})
		.then(response => {
			return response.json()
		}, error => console.log(error))
		.catch(error => console.log(error))
		.then(response => {
			this.setState({
				players: response,
			})
		}, error => console.log(error))
		.catch(error => console.log(error))
	}

	handleInput(e){
		this.setState({
			playerSearch: e.target.value
		})
	}

	handlePlayerSearch(){
		if(this.state.playerSearch.trim().length > 0){
			let url = 'player/getPlayers?name=' + encodeURI(this.state.playerSearch.trim())
			fetch(url, {
				method: 'GET'
			})
			.then(response => {
				return response.json()
			}, error => console.log(error))
			.catch(error => console.log(error))
			.then(response => {
				this.setState({
					players: response,
					sortOffset: 0
				})
				this.state.playerSearch = ''
			}, error => console.log(error))
			.catch(error => console.log(error))
		}
	}

	pageForward(){
		if(this.state.sortOffset + 10 <= this.state.players.length - 1){
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

	render(){
		let players = this.state.players.slice(this.state.sortOffset, this.state.sortOffset + 10);
		players = players.map(player => {
			return <div key={`${player.FullName} Card`}><RenderPlayerCard player = {player}/></div>
		})

		return(
			<div>
				<h1>Browse Players</h1>
				<div className="form-group mb-1">
					<label>Search By Name: </label>
					<input className="form-control col-12 col-md-6" 
						   onChange={this.handleInput}
						   value={this.state.playerSearch}/>
				</div>
				<div className="form-group">
					<button className="btn btn-primary"
							onClick={this.handlePlayerSearch}>
						Submit
					</button>
				</div>
				{players.length > 0 && players}
				<div className="form-group text-center">
					<button className="btn btn-primary m-1"
							onClick={this.pageBackward}>Previous Page</button>
					<button className="btn btn-primary m-1"
					        onClick={this.pageForward}>Next Page</button>
				</div>

			</div>
		)
	}
}

export default BrowsePlayers;