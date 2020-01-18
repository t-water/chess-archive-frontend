import React, {Component} from 'react';
import Board from './BoardComponent';
import Piece from './PieceComponent';

class Game extends Component{
	constructor(props){
		super(props)

		this.whiteProps = {
			isWhite: true,
		}
		this.blackProps = {
			isWhite: false,
		}
		this.commonProps = {
			handleMouseDown: this.props.handleMouseDown,
			handleDragStart: this.props.handleDragStart
		}
		
		this.convertSquaresToBeReadByBoard = this.convertSquaresToBeReadByBoard.bind(this)
	}

	convertSquaresToBeReadByBoard(squares){
		let boardSquares = []

		squares.forEach(x => {
			if(x === "r"){
				boardSquares.push(<Piece name="rook" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "n"){
				boardSquares.push(<Piece name="knight" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "b"){
				boardSquares.push(<Piece name="bishop" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "q"){
				boardSquares.push(<Piece name="queen" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "k"){
				boardSquares.push(<Piece name="king" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "p"){
				boardSquares.push(<Piece name="pawn" {...this.blackProps} {...this.commonProps}/>)
			}else if(x === "R"){
				boardSquares.push(<Piece name="rook" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === "N"){
				boardSquares.push(<Piece name="knight" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === "B"){
				boardSquares.push(<Piece name="bishop" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === "Q"){
				boardSquares.push(<Piece name="queen" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === "K"){
				boardSquares.push(<Piece name="king" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === "P"){
				boardSquares.push(<Piece name="pawn" {...this.whiteProps} {...this.commonProps}/>)
			}else if(x === null){
				boardSquares.push(null)
			}
		})

		return boardSquares
	}

	render(){
		let squaresProp = this.convertSquaresToBeReadByBoard(this.props.squares)
		return(
			<Board squares={squaresProp} 
				   isWhitesTurn={this.props.isWhitesTurn}
				   boardFlipped={this.props.boardFlipped}/>
		)
	}
}

export default Game