import React, {Component} from 'react';
import NavMenu from './NavMenu';
import { Switch, Route, Redirect } from 'react-router-dom';
import Analysis from './AnalysisComponent'
import BrowsePlayers from './BrowsePlayersComponent'
import Home from './HomeComponent'
import ViewGames from './ViewGamesComponent'
import ViewGame from './ViewGameComponent'
import BrowseGames from './BrowseGamesComponent'
import Footer from './FooterComponent'
import Contact from './ContactComponent'

class Main extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div id="window">
				<NavMenu/>
				<div className="container" id="content">
					<Switch>
						<Route path="/chess/home" component={Home}/>
						<Route path="/chess/analysis/:id?" component={Analysis}/>
						<Route path="/chess/browseplayers" component={BrowsePlayers}/>
						<Route path="/chess/viewgames/:id?" component={ViewGames}/>
						<Route path="/chess/game/:id?" component={ViewGame}/>
						<Route path="/chess/browsegames" component={BrowseGames}/>
						<Route path="/chess/contactus" component={Contact}/>
						<Redirect to="/chess/home"/>
					</Switch>
				</div>
				<Footer/>
			</div>
		)
	}
}

export default Main