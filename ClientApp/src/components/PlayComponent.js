import React, { Component } from 'react';
import Game from './GameComponent';

class Play extends Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<Game/>
		)
	}
}

export default Play