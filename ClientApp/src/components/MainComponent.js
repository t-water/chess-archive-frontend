import React, {Component} from 'react';
import NavMenu from './NavMenu';
import { Switch, Route, Redirect } from 'react-router-dom';
import Analysis from './AnalysisComponent'
import Upload from './UploadComponent'
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
						<Route path="/home" component={Home}/>
						<Route path="/analysis/:id?" component={Analysis}/>
						<Route path="/upload" component={Upload}/>
						<Route path="/browseplayers" component={BrowsePlayers}/>
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

export default Main