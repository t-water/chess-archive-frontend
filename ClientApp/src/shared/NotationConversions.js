function ConvertSquareNameToIndex(squareName){
	let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
	let squareLetter = squareName.split("")[0]
	let squareNumber = squareName.split("")[1]
	return ((8 - squareNumber) * 8) + letters.indexOf(squareLetter.toLowerCase())
}

function ConvertIndexToSquareName(index){
	let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
	let row = 8 - Math.floor(index / 8);
	let column = letters[index % 8]
	return column + row;
}

function ConvertFENtoBoardArray(fenString){
	let fenArray = fenString.split(" ")
	let pieces = fenArray[0]
	
	if(fenString.match(/^(\w+\/){7}\w+ [bw] [kKqQ-]{1,} ([a-h]\d|-) \d{1,} \d{1,}$/) &&
	   pieces.match(/k/g).length === 1 &&
	   pieces.match(/K/g).length === 1){
	   	let pieceArray = pieces.split("/").join("").split("")
	    if(pieceArray.length <= 64){
			let pieceArrayWithNulls = []
			pieceArray.forEach((x, i, arr) => {
				let nullCount = parseInt(x)
				if(/[0-9]/.test(nullCount)){
					for(let i=0; i<nullCount; i++){
						pieceArrayWithNulls.push(null)
					}
				}else{
					pieceArrayWithNulls.push(x)
				}
			})

			let whiteBackRank = pieceArrayWithNulls.slice(56, 64)
			let blackBackRank = pieceArrayWithNulls.slice(0,8)

			if(whiteBackRank.indexOf("P") === -1 &&
			   blackBackRank.indexOf("p") === -1){
			   	if(pieceArrayWithNulls.length === 64){
			   		return pieceArrayWithNulls
			   	}
			}	 
	    }  	
	}
	return false
}

function ConvertBoardArrayToFEN(squares, isWhitesTurn, castlingRestrictions, enPassantTargetIndex, halfMoveClock, fullMoveCount){
	let fenString = "";
	let nullCount = 0;
	squares.forEach((x,i) => {
		if(x !== null){
			if(nullCount !== 0){
				fenString += nullCount
				nullCount = 0
			}
			fenString += x
		}else{
			nullCount += 1
		}
		if(((i + 1) % 8 === 0)){
			if(nullCount !== 0){
				fenString += nullCount
				nullCount = 0
			}
			if(i<63){
				fenString += "/"
			}
			
		}
	})

	fenString += isWhitesTurn ? " w " : " b "
	
	let castling = false;
	if(castlingRestrictions.white.canCastleKingside){
		fenString += "K"
		castling = true;
	}if(castlingRestrictions.white.canCastleQueenside){
		fenString += "Q"
		castling = true;
	}if(castlingRestrictions.black.canCastleKingside){
		fenString += "k"
		castling = true;
	}if(castlingRestrictions.black.canCastleQueenside){
		fenString += "q"
		castling = true;
	}

	if(!castling){
		fenString += "- "
	}else{
		fenString += " "
	}

	if(enPassantTargetIndex){
		fenString += ConvertIndexToSquareName(enPassantTargetIndex) + " "
	}else{
		fenString += "- "
	}

	fenString += halfMoveClock + " "

	fenString += fullMoveCount

	return fenString
}

export {
	ConvertSquareNameToIndex,
	ConvertIndexToSquareName,
	ConvertFENtoBoardArray,
	ConvertBoardArrayToFEN
}