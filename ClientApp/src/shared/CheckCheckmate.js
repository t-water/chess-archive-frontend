import {findValidSquares} from './PieceLogic'

function InCheck(squares, index, king){
	let inCheck = false;
	let rowParam = Math.floor(index / 8) + 1
	let columnParam = index - ((rowParam - 1) * 8) + 1

	function evaluateAttackingPiece(formula, pieces){
		let potentialAttacker = squares[formula];
		if(potentialAttacker !== null){
			if(potentialAttacker !== undefined && 
			   (potentialAttacker.charCodeAt(0) <= 90 !== king.charCodeAt(0) <= 90) && 
			   pieces.indexOf(potentialAttacker) !== -1){
			   inCheck = true
				return true;
			}
			return null;
		}
		return false;
	}

	//Bishop
	function establishEdges(edge1, edge2){
		return edge1 <= edge2 ? edge1 : edge2
	}

	var rightUpEdge = establishEdges(8-columnParam, rowParam-1)
	var leftUpEdge = establishEdges(columnParam-1, rowParam-1)
	var rightDownEdge = establishEdges(8-rowParam, 8-columnParam)
	var leftDownEdge = establishEdges(columnParam-1, 8-rowParam)

	var edges = [rightUpEdge, leftUpEdge, rightDownEdge, leftDownEdge]
	var coefficients = [-7, -9, 9, 7]

	for(var x=0; x<4; x++){
		for(var y=1; y<(edges[x])+1; y++){
			if(evaluateAttackingPiece(index + coefficients[x]*y, ["b", "q", "B", "Q"]) !== false){
				break;
			}
		}
	}

// =================================================================================================

	//Rook
	// up
	for(var j=rowParam-1; j>0; j--){
		if(evaluateAttackingPiece((j*8) - (9-columnParam), ["r", "q", "R", "Q"]) !== false){
			break;
		}
	}

	//down
	for(var k=rowParam+1; k<9; k++){
		if(evaluateAttackingPiece((k*8) - (9-columnParam), ["r", "q", "R", "Q"]) !== false){
			break;
		}
	}

	//left
	for(var l=columnParam-1; l>0; l--){
		if(evaluateAttackingPiece(index-(columnParam-l), ["r", "q", "R", "Q"]) !== false){
			break;
		}
	}

	//right
	for(var m=columnParam+1; m<9; m++){
		if(evaluateAttackingPiece(index+(m-columnParam), ["r", "q", "R", "Q"]) !== false){
			break;
		}
	}
// ===================================================================================================
	
	//Knight
	if((columnParam-2) > 0){
		if((rowParam-1) > 0){
			evaluateAttackingPiece(((rowParam-1) * 8) - (9-(columnParam-2)), ["n", "N"])
		}
		if((rowParam + 1) < 9){
			evaluateAttackingPiece(((rowParam+1) * 8) - (9-(columnParam-2)), ["n", "N"])
		}
	}

	if((rowParam-2) > 0){
		if((columnParam-1) > 0){
			evaluateAttackingPiece(((rowParam-2) * 8) - (9-(columnParam-1)), ["n", "N"])
		}
		if((columnParam+1) < 9){
			evaluateAttackingPiece(((rowParam-2) * 8) - (9-(columnParam + 1)), ["n", "N"])
		}
	}

	if((columnParam+2) < 9){
		if((rowParam-1) > 0){
			evaluateAttackingPiece(((rowParam-1) * 8) - (9-(columnParam+2)), ["n", "N"])
		}
		if((rowParam + 1) < 9){
			evaluateAttackingPiece(((rowParam+1) * 8) - (9-(columnParam+2)), ["n", "N"])
		}
	}

	if((rowParam+2) < 9){
		if((columnParam-1) > 0){
			evaluateAttackingPiece(((rowParam+2) * 8) - (9-(columnParam-1)), ["n", "N"])
		}
		if((columnParam+1) < 9){
			evaluateAttackingPiece(((rowParam+2) * 8) - (9-(columnParam+1)), ["n", "N"])
		}
	}
//======================================================================================================
	//pawn
	if(king.charCodeAt(0) <= 90){
		if(columnParam > 1){
			evaluateAttackingPiece(index - 9, ["p"])
		}
		if(columnParam < 8){
			evaluateAttackingPiece(index - 7, ["p"])
		}
	}else{
		if(columnParam > 1){
			evaluateAttackingPiece(index + 7, ["P"])
		}
		if(columnParam < 8){
			evaluateAttackingPiece(index + 9, ["P"])
		}
	}
//========================================================================================================

	//king
	if(columnParam > 1){
		evaluateAttackingPiece(index-1, ["k", "K"])
		if(rowParam > 1){
			evaluateAttackingPiece(index - 9, ["k", "K"])
		}
		if(rowParam < 8){
			evaluateAttackingPiece(index + 7, ["k", "K"])
		}
	}
	if(columnParam < 8){
		evaluateAttackingPiece(index + 1, ["k", "K"])
		if(rowParam > 1){
			evaluateAttackingPiece(index - 7, ["k", "K"])
		}
		if(rowParam < 8){
			evaluateAttackingPiece(index + 9, ["k", "K"])
		}
	}
	if(rowParam > 1){
		evaluateAttackingPiece(index - 8, ["k", "K"])
	}
	if(rowParam < 8){
		evaluateAttackingPiece(index + 8, ["k", "K"])
	}

	return inCheck
}

function InCheckmate(squares, king){
	let pieces = squares.slice()

	pieces = pieces.map((x, i) => {return {piece: x, index: i}})

	pieces = pieces.filter(x => x.piece !== null)
	if(king.charCodeAt(0) <= 90){
		pieces = pieces.filter(x => x.piece.charCodeAt(0) <= 90)
	}else{
		pieces = pieces.filter(x => x.piece.charCodeAt(0) > 90)
	}
	
	for(let i=0; i<pieces.length; i++){
		let validSquares = []
		validSquares = findValidSquares(squares, pieces[i].piece, pieces[i].index)
		for(let j=0; j<validSquares.length; j++){
			let tempSquaresArray = squares.slice();
			tempSquaresArray[pieces[i].index] = null
			tempSquaresArray[validSquares[j]] = pieces[i].piece
			if(!InCheck(tempSquaresArray, tempSquaresArray.indexOf(king), king)){
				return false;
			}
		}
	}
	return true
}

export {
	InCheck,
	InCheckmate
}