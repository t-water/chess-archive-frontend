import React, {Component} from 'react';
import IMAGE_URLS from '../shared/ImageUrls';

class Piece extends Component{
	constructor(props){
		super(props);
		this.validSquares = []
		this.handleMouseDown = this.handleMouseDown.bind(this)
	}

	handleMouseDown(e){
		if(this.props.handleMouseDown){
			if(this.props.isWhitesTurn === this.props.isWhite){
				this.props.handleMouseDown(e, this)
			}
		}
	}

	render(){
		let pieceColor = this.props.isWhite ? "white" : "black"

		return(<img src={'/chess' + IMAGE_URLS[`${pieceColor.toUpperCase()}_${this.props.name.toUpperCase()}`]}
					alt={`${pieceColor}_${this.props.name}`}
			        className="piece-img"
			        onMouseDown={this.handleMouseDown}
			        onDragStart={this.props.handleDragStart}/>)
	}
}

export default Piece