import React, {Component} from 'react';
import { Card, CardText, CardBody } from 'reactstrap';

function RenderGameCard({game}){
	return(
		<Card className="mb-3">
			<CardBody>
				<CardText><strong>Event:</strong> {game.Event}</CardText>
				<CardText><strong>Round:</strong> {game.Round}</CardText>
				<CardText><strong>White:</strong> {game.WhitePlayer.FullName}</CardText>
				<CardText><strong>Black:</strong> {game.BlackPlayer.FullName}</CardText>
				<CardText><a href={"/game/" + game.Id}>View Game</a></CardText>
			</CardBody>
		</Card>
	)
}

class ViewGames extends Component{
	constructor(props){
		super(props)

		this.state = {
			player: null,
			games: []
		}
	}

	componentDidMount(){
		fetch('/player/viewgames?id=' + this.props.match.params.id, {
			method: 'GET'
		})
		.then(response => {
			return response.json()
		}, error => console.log(error))
		.catch(error => console.log(error))
		.then(response => {
			if(response.Player !== null){
				this.setState({
					player: response.Player,
					games: response.Games
				})
			}
		}, error => console.log(error))
		.catch(error => console.log(error))
	}

	render(){
		if(this.state.player){
			let games = this.state.games.map(game => {
				return <div key={`${game.Event} ${game.Round}`}><RenderGameCard game={game}/></div>
			})
			return(
				<div>
					<h1>{this.state.player.FullName}</h1>
					<div>{games}</div>
				</div>
			)
		}else{
			return(
				<div>
					<h3>Player Not Found</h3>
					<a href="/home">Return Home</a>
				</div>
			)
		}
		
	}
}

export default ViewGames;