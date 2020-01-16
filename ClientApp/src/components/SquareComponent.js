import React from 'react';

function Square(props){
	let indexProp = props.boardFlipped ? 63 - props.index : props.index
	let pieceProp = props.piece ? React.cloneElement(props.piece, {index: indexProp,
																			 row: props.row,
																			 rowParam: props.rowParam,
																			 column: props.column,
																			 columnParam: props.columnParam,
																			 isWhitesTurn: props.isWhitesTurn}) : null
	return(
		<button className={`btn ${props.squareColor} droppable square p-0`}
				data-index={indexProp}>
			{pieceProp}
		</button>
	)
}

export default Square;