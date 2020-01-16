import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderGameCard({game}){
	return(
		<Card className="mb-3">
			<CardBody>
				<CardTitle>{game.Event}</CardTitle>
				<CardText>Round: {game.Round}</CardText>
				<CardText><a href={"/game/" + game.Id}>View Game</a></CardText>
			</CardBody>
		</Card>
	)
}

class BrowseGames extends Component{
	constructor(props){
		super(props)

		this.state = {
			games: [],
			sortOffset: 0,
			gameSearch: ''
		}

		this.pageBackward = this.pageBackward.bind(this)
		this.pageForward = this.pageForward.bind(this)
	}

	componentDidMount(){
		fetch('/pgn/getGames', {
			method: 'GET'
		})
		.then(response => response.json())
		.then(response => {
			this.setState({
				games: response
			})
		})
	}

	pageForward(){
		if(this.state.sortOffset + 10 <= this.state.games.length - 1){
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

	handleGameSearch(){
		this.setState({
			gameSearch: e.target.value
		}, () => {
			let url = 'pgn/getGames?eventName=' + this.state.gameSearch.trim()
			fetch(url, {
				method: 'GET'
			})
			.then(response => response.json())
			.then(response => {
				this.setState({
					games: response,
					sortOffset: 0
				})
			})
		})
	}

	render(){
		let games = this.state.games.slice(this.state.sortOffset, this.state.sortOffset + 10);
		games = games.map(game => {
			return(<div key={`${game.Event}: Round ${game.Round} Card`}><RenderGameCard game={game}/></div>)
		})
		return(
			<div>
				<h1>Browse Games</h1>
				<div className="form-group">
					<label>Search By Event Title: </label>
					<input className="form-control col-12 col-md-6" 
						   onChange={this.handleGameSearch}
						   value={this.state.gameSearch}/>
				</div>
				{games.length > 0 && games}
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

export default BrowseGames