import {InCheck} from './CheckCheckmate'

function findValidSquares(squares, piece, index, enPassantTargetIndex){
	let rowParam = Math.floor(index / 8) + 1
	let columnParam = index - ((rowParam - 1) * 8) + 1

	var validSquares = []
	
	if(piece ===  "b" || piece === "B"){
		findValidBishopSquares(index, rowParam, columnParam)
	}else if(piece === "n" || piece === "N"){
		findValidKnightSquares(index, rowParam, columnParam)
	}else if(piece === "r" || piece === "R"){
		findValidRookSquares(index, rowParam, columnParam)
	}else if(piece === "q" || piece === "Q"){
		findValidBishopSquares(index, rowParam, columnParam)
		findValidRookSquares(index, rowParam, columnParam)
	}else if(piece === "p" || piece === "P"){
		findValidPawnSquares(index, rowParam, columnParam)
	}else if(piece === "k" || piece === "K"){
		findValidKingSquares(index, rowParam, columnParam)
	}

	function collisionCaptureLogic(formula){
		if(squares[formula] !== null){
			if((piece.charCodeAt(0) > 90) === (squares[formula].charCodeAt(0) > 90)){
				return false
			}
			if((piece.charCodeAt(0) > 90) !== (squares[formula].charCodeAt(0) > 90)){
				validSquares.push(formula)
				return "capture"
			}
		}else{
			validSquares.push(formula)
			return true
		}
	}

	function establishEdges(edge1, edge2){
		return edge1 <= edge2 ? edge1 : edge2
	}

	function findValidBishopSquares(index, rowParam, columnParam){
		var rightUpEdge = establishEdges(8-columnParam, rowParam-1)
		var leftUpEdge = establishEdges(columnParam-1, rowParam-1)
		var rightDownEdge = establishEdges(8-rowParam, 8-columnParam)
		var leftDownEdge = establishEdges(columnParam-1, 8-rowParam)

		var edges = [rightUpEdge, leftUpEdge, rightDownEdge, leftDownEdge]
		var coefficients = [-7, -9, 9, 7]

		for(var x=0; x<4; x++){
			for(var y=1; y<(edges[x])+1; y++){
				if(collisionCaptureLogic((index + coefficients[x]*y), index) !== true){break}
			}
		}
	}

	function findValidKnightSquares(index, rowParam, columnParam)
	{
		if((columnParam-2) > 0){
			if((rowParam-1) > 0){
				collisionCaptureLogic((((rowParam-1) * 8) - (9-(columnParam-2))), index)	
			}
			if((rowParam + 1) < 9){
				collisionCaptureLogic((((rowParam+1) * 8) - (9-(columnParam-2))), index)
			}
		}

		if((rowParam-2) > 0){
			if((columnParam-1) > 0){
				collisionCaptureLogic((((rowParam-2) * 8) - (9-(columnParam-1))), index)
			}
			if((columnParam+1) < 9){
				collisionCaptureLogic((((rowParam-2) * 8) - (9-(columnParam + 1))), index)
			}
		}

		if((columnParam+2) < 9){
			if((rowParam-1) > 0){
				collisionCaptureLogic((((rowParam-1) * 8) - (9-(columnParam+2))), index)	
			}
			if((rowParam + 1) < 9){
				collisionCaptureLogic((((rowParam+1) * 8) - (9-(columnParam+2))), index)
			}
		}

		if((rowParam+2) < 9){
			if((columnParam-1) > 0){
				collisionCaptureLogic((((rowParam+2) * 8) - (9-(columnParam-1))), index)
			}
			if((columnParam+1) < 9){
				collisionCaptureLogic((((rowParam+2) * 8) - (9-(columnParam+1))), index)
			}
		}
	}

	function findValidRookSquares(index, rowParam, columnParam){		
		//up
		for(var j=rowParam-1; j>0; j--){
			if(collisionCaptureLogic(((j*8) - (9-columnParam)), index) !== true) {break}
		}

		//down
		for(var k=rowParam+1; k<9; k++){
			if(collisionCaptureLogic(((k*8) - (9-columnParam)), index) !== true) {break}
		}

		//left
		for(var l=columnParam-1; l>0; l--){
			if(collisionCaptureLogic((index-(columnParam-l)), index) !== true) {break}
		}

		//right
		for(var m=columnParam+1; m<9; m++){
			if(collisionCaptureLogic((index+(m-columnParam)), index) !== true) {break}
		}
	}

	function pawnCollisionLogic(formula){
		if(squares[formula] !== null){
			return false
		}else{
			validSquares.push(formula)
			return true
		}	
	}

	function pawnCaptureLogic(index, rowParam, columnParam){
		if(piece.charCodeAt(0) <= 90){
			if(rowParam > 1){
				//capture left
				if((columnParam - 1 > 0) && (squares[index - 9] != null) && (squares[index - 9].charCodeAt(0) > 90)){
					validSquares.push(index - 9)
				}
				//capture right
				if((columnParam + 1 < 9) && (squares[index - 7] != null) && (squares[index - 7].charCodeAt(0) > 90)){
					validSquares.push(index-7)
				}
			}
		}else{
			if(rowParam < 8){
				//capture left
				if((columnParam - 1 > 0) && (squares[index + 7] != null) && (squares[index + 7].charCodeAt(0) <= 90)){
					validSquares.push(index+7)
				}

				//capture right
				if((columnParam + 1 < 9) && (squares[index + 9] != null) && (squares[index + 9].charCodeAt(0) <= 90)){
					validSquares.push(index+9)
				}
			}
		}
	}

	function findValidPawnSquares(index, rowParam, columnParam){
		if(piece.charCodeAt(0) <= 90){
			if(rowParam === 7){
				if(pawnCollisionLogic(index-8)){
					pawnCollisionLogic(index-16)
				}
			}else if(rowParam < 7 && rowParam > 1){
				pawnCollisionLogic(index-8)
			}
		}else{
			if(rowParam === 2){
				if(pawnCollisionLogic(index+8)){
					pawnCollisionLogic(index+16)
				}
			}else if(rowParam < 8 && rowParam > 2){
				pawnCollisionLogic(index+8)
			}
		}

		pawnCaptureLogic(index, rowParam, columnParam)
		handleEnPassant(piece, index, enPassantTargetIndex)
	}

	function findValidKingSquares(index, rowParam, columnParam){
		if(columnParam > 1){
			collisionCaptureLogic(index-1)
			if(rowParam > 1){
				collisionCaptureLogic(index - 9)
			}
			if(rowParam < 8){
				collisionCaptureLogic(index + 7)
			}
		}
		if(columnParam < 8){
			collisionCaptureLogic(index + 1)
			if(rowParam > 1){
				collisionCaptureLogic(index - 7)
			}
			if(rowParam < 8){
				collisionCaptureLogic(index + 9)
			}
		}
		if(rowParam > 1){
			collisionCaptureLogic(index - 8)
		}
		if(rowParam < 8){
			collisionCaptureLogic(index + 8)
		}
	}

	function handleEnPassant(pawn, index, targetIndex){
		let rowParam = Math.floor(index / 8) + 1
		let columnParam = index - ((rowParam - 1) * 8) + 1

		if(targetIndex !== null){
			if(pawn.charCodeAt(0) <= 90){
				if(rowParam > 1){
					//capture left
					if((columnParam - 1 > 0) && (index - 9 === targetIndex)){
						validSquares.push(index-9)
					}
					//capture right
					if((columnParam + 1 < 9) && (index - 7 === targetIndex)){
						validSquares.push(index-7)
					}
				}
			}else{
				if(rowParam < 8){
					//capture left
					if((columnParam - 1 > 0) && (index + 7 === targetIndex)){
						validSquares.push(index+7)
					}

					//capture right
					if((columnParam + 1 < 9) && (index + 9 === targetIndex)){
						validSquares.push(index+9)
					}
				}
			}
		}
	}

	return validSquares
}

function checkForCastling(squares, startingIndex, endingIndex, piece, castlingRestrictions){	
	if(startingIndex - endingIndex === -2 || startingIndex - endingIndex === -3){
		
		if(squares[startingIndex + 1] === null && squares[startingIndex + 2] === null){
			
			if((piece === "k" && castlingRestrictions.black.canCastleKingside) ||
			   (piece === "K" && castlingRestrictions.white.canCastleKingside)){
				
				if(!InCheck(squares, startingIndex, piece) &&
				   !InCheck(squares, startingIndex + 1, piece) &&
				   !InCheck(squares, startingIndex + 2, piece)){
					
					let castledSquares = squares.slice();
					let rook = castledSquares[startingIndex + 3]

					castledSquares[startingIndex] = null
					castledSquares[startingIndex + 3] = null
					castledSquares[startingIndex + 2] = piece
					castledSquares[startingIndex + 1] = rook
					return castledSquares
				}else{
					return false
				}
			}else{
				return false
			}
		}else{
			return false
		}
	}else if(startingIndex - endingIndex === 2 || startingIndex - endingIndex === 3 || startingIndex - endingIndex === 4){
		if(squares[startingIndex - 1] === null && squares[startingIndex - 2] === null && squares[startingIndex - 3] === null){
			if((piece === "k" && castlingRestrictions.black.canCastleQueenside) ||
			   (piece === "K" && castlingRestrictions.white.canCastleQueenside)){
				if(!InCheck(squares, startingIndex, piece) &&
				   !InCheck(squares, startingIndex - 1, piece) &&
				   !InCheck(squares, startingIndex - 2, piece)){
					let castledSquares = squares.slice();
					let rook = castledSquares[startingIndex - 4]
					if(rook !== null){
						castledSquares[startingIndex] = null
						castledSquares[startingIndex - 4] = null
						castledSquares[startingIndex - 2] = piece
						castledSquares[startingIndex - 1] = rook
						return castledSquares
					}else{
						return false
					}
				}else{
					return false
				}
			}else{
				return false
			}
		}else{
			return false
		}
	}else{
		return false
	}
}

export {
	findValidSquares,
	checkForCastling
}