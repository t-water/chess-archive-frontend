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
		this.handleInput = this.handleInput.bind(this)
		this.handleGameSearch = this.handleGameSearch.bind(this)
	}

	componentDidMount(){
		fetch('/pgn/getGames', {
			method: 'GET'
		})
		.then(response => {
			return response.json()
		}, error => console.log(error))
		.catch(error => console.log(error))
		.then(response => {
			this.setState({
				games: response
			})
		}, error => console.log(error))
		.catch(error => console.log(error))
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

	handleInput(e){
		this.setState({
			gameSearch: e.target.value
		})
	}

	handleGameSearch(){
		if(this.state.gameSearch.trim().length > 0){
			let url = 'pgn/getGames?eventName=' + encodeURI(this.state.gameSearch.trim())
			fetch(url, {
				method: 'GET'
			})
			.then(response => {
				return response.json()
			}, error => console.log(error))
			.catch(error => console.log(error))
			.then(response => {
				this.setState({
					games: response,
					sortOffset: 0
				})
				this.state.gameSearch = ''
			}, error => console.log(error))
			.catch(error => console.log(error))
		}
	}

	render(){
		let games = this.state.games.slice(this.state.sortOffset, this.state.sortOffset + 10);
		games = games.map(game => {
			return(<div key={`${game.Event}: Round ${game.Round} Card`}><RenderGameCard game={game}/></div>)
		})
		return(
			<div>
				<h1>Browse Games</h1>
				<div className="form-group mb-1">
					<label>Search By Event Title: </label>
					<input className="form-control col-12 col-md-6" 
						   value={this.state.gameSearch}
						   onChange={this.handleInput}/>
				</div>
				<div className="form-group">
					<button className="btn btn-primary"
							onClick={this.handleGameSearch}>
						Submit
					</button>
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