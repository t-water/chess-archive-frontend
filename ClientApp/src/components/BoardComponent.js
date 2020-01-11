import React, {Component} from 'react';
import Square from './SquareComponent';

class Board extends Component{
	constructor(props){
		super(props);
		// this.resizeSquares = this.resizeSquares.bind(this)
	}

	// resizeSquares(){
	// 	let squares = document.querySelectorAll('.square')
	// 	squares.forEach(x => {
	// 		let width = getComputedStyle(x).getPropertyValue('width')
	// 		x.style.height = width
	// 		if(x.firstChild !== null){
	// 			x.firstChild.style.width = width
	// 			x.firstChild.style.height = width
	// 		}
	// 	})
	// }

	// componentDidMount(){
	// 	window.addEventListener("resize", this.resizeSquares, false);
	// 	this.resizeSquares();
	// }

	// componentWillUnmount(){
	//     window.removeEventListener("resize", this.resizeSquares, false);
	// }

	render(){
		let squares = []
		let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
		for(let i=0; i<8; i++){
			let row = []
			for(let j=0; j<8; j++){
				let piecePositionNumber = (8*i) + j;
				let piece = this.props.squares[(8*i) + j];
				let pieceProp;
				if(piece){
					pieceProp = React.cloneElement(this.props.squares[piecePositionNumber])
				}else{
					pieceProp = piece;
				}
				let squareColorProp;
				if(piecePositionNumber % 2 === 0){
					squareColorProp = i % 2 === 0 ? "bg-light" : "bg-dark"
				}else{
					squareColorProp = i % 2 === 0 ? "bg-dark" : "bg-light"
				}
				row.push(<Square squareColor={squareColorProp} 
								 piece={this.props.squares[piecePositionNumber]} 
								 key={`${columns[j%8]}${8-i}`}
								 squareName={`${columns[j%8]}${8-i}`}
								 row={8-i}
								 rowParam={i+1}
								 columnParam={j%8 + 1}
								 column={columns[j%8]}
								 index={piecePositionNumber}
								 isWhitesTurn={this.props.isWhitesTurn}
								 boardFlipped={this.props.boardFlipped}/>)
			}
			squares.push(<div key={8-i} id={`row-${8-i}`}>{row}</div>)
		}
		return(
			<div className="mt-3">
				{squares}
			</div>
		)
	}
} 

export default Board;