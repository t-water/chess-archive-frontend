import React, {Component} from 'react';

class Square extends Component{
	constructor(props){
		super(props)
	}

	render(){
		let indexProp = this.props.boardFlipped ? 63 - this.props.index : this.props.index
		let pieceProp = this.props.piece ? React.cloneElement(this.props.piece, {index: indexProp,
																				 row: this.props.row,
																				 rowParam: this.props.rowParam,
																				 column: this.props.column,
																				 columnParam: this.props.columnParam,
																				 isWhitesTurn: this.props.isWhitesTurn}) : null
		return(
			<button className={`btn ${this.props.squareColor} droppable square p-0`}
					data-index={indexProp}>
				{pieceProp}
			</button>
		)
	}
}

export default Square;