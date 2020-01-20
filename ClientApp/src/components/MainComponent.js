import React, {Component} from 'react';
import NavMenu from './NavMenu';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Analysis from './AnalysisComponent'
import BrowsePlayers from './BrowsePlayersComponent'
import Home from './HomeComponent'
import ViewGames from './ViewGamesComponent'
import ViewGame from './ViewGameComponent'
import BrowseGames from './BrowseGamesComponent'
import Footer from './FooterComponent'
import Contact from './ContactComponent'
import { connect } from 'react-redux';
import { fetchPlayers, fetchGames } from '../redux/actionCreators'

const mapStateToProps = state => {
	return {
		players: state.players,
		games: state.games
	}
}

const mapDispatchToProps = dispatch => ({
	fetchPlayers: () => {dispatch(fetchPlayers())},
	fetchGames: () => {dispatch(fetchGames())}
})

class Main extends Component{
	componentDidMount(){
		this.props.fetchPlayers();
		this.props.fetchGames();
	}

	render(){
		const HomePage = () => {
			return(
				<Home players={this.props.players.players.filter(p => p.Featured)}
				      playersLoading={this.props.players.isLoading}
				      playersErrMess={this.props.players.errMess}
				      games={this.props.games.games.filter(g => g.Featured)}
				      gamesLoading={this.props.games.isLoading}
				      gamesErrMess={this.props.games.errMess}/>
			)
		}
		return(
			<div id="window">
				<NavMenu/>
				<div className="container" id="content">
					<Switch>
						<Route path="/home" component={HomePage}/>
						<Route path="/analysis/:id?" component={Analysis}/>
						<Route path="/browseplayers" component={() => <BrowsePlayers players={this.props.players.players} 
																					 isLoading={this.props.players.isLoading}
																					 errMess={this.props.errMess}/>}/>
						<Route path="/viewgames/:id?" component={ViewGames}/>
						<Route path="/game/:id?" component={ViewGame}/>
						<Route path="/browsegames" component={BrowseGames}/>
						<Route path="/contactus" component={Contact}/>
						<Redirect to="/home"/>
					</Switch>
				</div>
				<Footer/>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));