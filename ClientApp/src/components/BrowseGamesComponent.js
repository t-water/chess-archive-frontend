import React, {Component} from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import Spinner from './SpinnerComponent';

function RenderGames({games, isLoading, errMess}){
	if(isLoading){
		return <div className="text-center mb-3"><Spinner height={100}/></div>
	}else if(errMess){
		return <h4 className = "text-center">Unable to Load Games</h4>
	}else{
		if(games.length > 0){
			return games.map(g => {
				return(
					<div key={`${g.Event} ${g.Round} Card`}>
						<Card className="mb-3">
							<CardBody>
								<CardTitle>{g.Event}</CardTitle>
								<CardText>Round: {g.Round}</CardText>
								<CardText>White: {g.WhitePlayer.FullName}</CardText>
								<CardText>Black: {g.BlackPlayer.FullName}</CardText>
								<CardText>Date: {g.Date}</CardText>
								<CardText><a href={"/game/" + g.Id}>View Game</a></CardText>
							</CardBody>
						</Card>
					</div>
				)
			})
		}else{
			return <h4 className="text-center">No Games Found</h4>
		}

	}
}

class BrowseGames extends Component{
	constructor(props){
		super(props)

		this.state = {
			gameSearch: '',
			sortOffset: 0
		}
		
		this.searchFilter = this.searchFilter.bind(this)
		this.pageForward = this.pageForward.bind(this)
		this.pageBackward = this.pageBackward.bind(this)
		this.handleInput = this.handleInput.bind(this)
	}

	searchFilter(x){
		if(x.Event.toLowerCase().includes(this.state.gameSearch.toLowerCase())){
			return true
		}else if(x.WhitePlayer.FullName.toLowerCase().includes(this.state.gameSearch.toLowerCase())){
			return true
		}else if(x.BlackPlayer.FullName.toLowerCase().includes(this.state.gameSearch.toLowerCase())){
			return true
		}else{
			return false
		}
	}

	pageForward(){
		let gameCount = this.props.games.filter(g => this.searchFilter(g)).length
		if(this.state.sortOffset + 10 <= gameCount - 1){
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
	
	render(){
		let games = this.props.games.filter(g => this.searchFilter(g))
									.slice(this.state.sortOffset, this.state.sortOffset + 10);
		 
		return(
			<div>
				<h1>Browse Games</h1>
				<div className="form-group mb-1">
					<label>Search: </label>
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
				<RenderGames games={games}
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

export default BrowseGames