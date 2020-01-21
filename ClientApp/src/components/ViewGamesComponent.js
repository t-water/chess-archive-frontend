import React, {Component} from 'react';
import { Card, CardText, CardBody } from 'reactstrap';
import SERVER_BASE_URL from '../shared/ServerBaseUrl';

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
	}

	render(){
		if(this.props.playerLoading || this.props.gamesLoading){
			return(<h2 className="text-center">...Loading</h2>)
		}else if(this.props.playerErrMess || this.props.gamesErrMess){
			return(
				<div className="text-center">
					<h2>Error Loading Games</h2>
					<a href="/home">Return Home</a>
				</div>
			)
		}else if(!this.props.player){
			return(
				<div className="text-center">
					<h2>Player Not Found</h2>
					<a href="/home">Return Home</a>
				</div>
			)
		}else{
			let games = this.props.games.map(game => {
				return <div key={`${game.Event} ${game.Round}`}><RenderGameCard game={game}/></div>
			})
			return(
				<div>
					<h1>{this.props.player.FullName}</h1>
					<div>{games}</div>
				</div>
			)
		}		
	}
}

export default ViewGames;