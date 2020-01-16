import React from 'react';
import Square from './SquareComponent';

function Board(props){
	let squares = []
	let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
	for(let i=0; i<8; i++){
		let row = []
		for(let j=0; j<8; j++){
			let piecePositionNumber = (8*i) + j;
			let squareColorProp;
			if(piecePositionNumber % 2 === 0){
				squareColorProp = i % 2 === 0 ? "bg-light" : "bg-dark"
			}else{
				squareColorProp = i % 2 === 0 ? "bg-dark" : "bg-light"
			}
			row.push(<Square squareColor={squareColorProp} 
							 piece={props.squares[piecePositionNumber]} 
							 key={`${columns[j%8]}${8-i}`}
							 squareName={`${columns[j%8]}${8-i}`}
							 row={8-i}
							 rowParam={i+1}
							 columnParam={j%8 + 1}
							 column={columns[j%8]}
							 index={piecePositionNumber}
							 isWhitesTurn={props.isWhitesTurn}
							 boardFlipped={props.boardFlipped}/>)
		}
		squares.push(<div key={8-i} id={`row-${8-i}`}>{row}</div>)
	}
	return(
		<div className="mt-3">
			{squares}
		</div>
	)
} 

export default Board;