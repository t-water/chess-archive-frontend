import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import Spinner from './SpinnerComponent'

function RenderPlayerCard({player}){
	return(
		<Card className = "mb-3">
			<CardBody>
				<CardTitle>{player.FullName}</CardTitle>
				<CardText>{player.Country}</CardText>
				<CardText>Born: {player.BirthDate}</CardText>
				{player.DeathDate !== null && <CardText>Died: {player.DeathDate}</CardText>}
				<CardText><a href={"/viewgames/" + player.PlayerId}>View Games</a></CardText>
			</CardBody>
		</Card>
	)
}

class BrowsePlayers extends Component{
	constructor(props){
		super(props)

		this.state = {
			players: []
		}
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

	render(){
		if(this.state.players.length > 0){
			let players = this.state.players.map(player => {
				return <div key={`${player.FullName} Card`}><RenderPlayerCard player = {player}/></div>
			})
			return <div>{players}</div>
		}else{
			return(<div><Spinner/></div>)
		}
		
	}
}

export default BrowsePlayers;