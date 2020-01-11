import React, {Component} from 'react';
import NavMenu from './NavMenu';
import { Switch, Route } from 'react-router-dom';
import Analysis from './AnalysisComponent'
import Upload from './UploadComponent'

class Main extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div>
				<NavMenu/>
				<div className="container">
					<Switch>
						<Route path="/analysis/:id?" component={Analysis}/>
						<Route path="/upload" component={Upload}/>
					</Switch>
				</div>
			</div>
		)
	}
}

export default Main