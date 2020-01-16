import {findValidSquares, checkForCastling} from './PieceLogic';
import {InCheck, InCheckmate} from './CheckCheckmate';
import {ConvertSquareNameToIndex, ConvertIndexToSquareName, ConvertFENtoBoardArray, ConvertBoardArrayToFEN} from './NotationConversions'

export function PlayChess(fen){
	ConvertFENtoBoardArray('5k2/pp4p1/4pp2/1P5p/8/P2KP1P1/5P1b/2B5 w - h6 0 31');

	let startingPosition = [
	 'r', "n", 'b', 'q', 'k', 'b', "n", 'r',
	 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
	 null, null, null, null, null, null, null, null,
	 null, null, null, null, null, null, null, null,
	 null, null, null, null, null, null, null, null,
	 null, null, null, null, null, null, null, null,
	 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
	 'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R' 
	]

	this.getStartingPosition = function(){
		return startingPosition.slice();
	}

	let castlingRestrictions = {
		white: {
			canCastleKingside: true,
			canCastleQueenside: true
		},
		black: {
			canCastleKingside: true,
			canCastleQueenside: true
		}
	}

	this.getCastlingRestrictions = function(){
		return castlingRestrictions
	}

	this.updateCastingRestrictions = function(piece, startingIndex){
		if(piece === 'r'){
			if(parseInt(startingIndex) === 0){
				castlingRestrictions.black.canCastleQueenside = false
			}else if(parseInt(startingIndex) === 7){
				castlingRestrictions.black.canCastleKingside = false;
			}
		}else if(piece === "R"){
			if(parseInt(startingIndex) === 56){
				castlingRestrictions.white.canCastleQueenside = false
			}else if(parseInt(startingIndex) === 63){
				castlingRestrictions.white.canCastleKingside = false;
			}
		}else if(piece === "k"){
			if(parseInt(startingIndex) === 4){
				castlingRestrictions.black.canCastleQueenside = false
				castlingRestrictions.black.canCastleKingside = false
			}
		}else if(piece === "K"){
			if(parseInt(startingIndex) === 60){
				castlingRestrictions.white.canCastleQueenside = false
				castlingRestrictions.white.canCastleKingside = false
			}
		}
	}

	let enPassantTargetIndex = null;

	this.getEnPassantTargetIndex = function(){
		return enPassantTargetIndex
	}

	this.setEnPassantTargetIndex = function(i){
		enPassantTargetIndex = i;
	}

	let isWhitesTurn = true;

	this.getIsWhitesTurn = function(){
		return isWhitesTurn
	}

	this.setIsWhitesTurn = function(bool){
		if(bool === true){
			isWhitesTurn = true
		}else if(bool === false){
			isWhitesTurn = false
		}
	}

	this.endTurn = function(){
		isWhitesTurn = !isWhitesTurn
	}

	let fullMoveNumber = 1;
	
	this.getFullMoveNumber = function(){
		return fullMoveNumber
	}

	this.setFullMoveNumber = function(num){
		fullMoveNumber = num;
	}

	let halfMoveClock = 0

	this.getHalfMoveClock = function(){
		return halfMoveClock
	}

	this.setHalfMoveClock = function(num){
		halfMoveClock = num
	}

	let currentPosition = this.getStartingPosition()

	this.getCurrentPosition = function(){
		return currentPosition.slice()
	}

	this.setCurrentPosition = function(position){
		currentPosition = position
	}

	this.whatsInSquare = function(num){
		return currentPosition[num]
	}

	let startingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
	
	this.getStartingFen = function(){
		return startingFEN
	}

	this.setStartingFen = function(fenString){
		startingFEN = fenString
	}

	let validMoveAttempt = true

	this.getValidMoveAttempt = function(){
		return validMoveAttempt
	}

	this.setValidMoveAttempt = function(bool){
		if(bool === true){
			validMoveAttempt = true;
		}else if(bool === false){
			validMoveAttempt = false;
		}
	}

	let pgn = []

	this.getPGN = function(){
		return pgn.slice()
	}

	this.setPGN = function(arr){
		pgn = arr.slice()
	}

	this.addToPGN = function(piece, startingIndex, endingIndex, capture, check, checkmate, result){
		let entry = "";

		if(isWhitesTurn){
			entry += fullMoveNumber + ". "
		}

		if(piece === "O-O" || piece === "O-O-O"){
			return entry + piece + " "
		}

		if(piece !== 'p' && piece !== 'P'){
			entry += piece.toUpperCase();
		}

		if(capture){
			if(piece === 'p' || piece === 'P'){
				entry += ConvertIndexToSquareName(startingIndex)[0]
			}
			entry += "x";
		}

		entry += ConvertIndexToSquareName(endingIndex)

		if(checkmate){
			entry += '#'
		}else if(check){
			entry += '+'
		}

		entry += " " + result

		return entry + " "
	}

	let history = [this.getStartingFen()]

	this.getHistory = function(){
		return history.slice()
	}

	this.setHistory = function(arr){
		history = arr.slice()
	}

	this.pushToHistory = function(entry){
		history.push(entry)
	}

	let timeTravelIndex = 0;
	this.getTimeTravelIndex = function(){
		return timeTravelIndex
	}

	this.setTimeTravelIndex = function(num){
		if(num >= 0 && num <= this.getHistory().length){
			timeTravelIndex = num
		}
	}

	let timeTravelArray = this.getCurrentPosition()

	this.getTimeTravelArray = function(){
		return timeTravelArray.slice()
	}

	this.setTimeTravelArray = function(arr){
		timeTravelArray = arr.slice();
	}

	this.timeTravel = function(i){
		if(i >= 0 && i <= history.length - 1){
			timeTravelIndex = i;
			timeTravelArray = ConvertFENtoBoardArray(history[timeTravelIndex])
			let piecesOfFEN = history[timeTravelIndex].split(" ")
			isWhitesTurn = piecesOfFEN[1] === "w" ? true : false
			halfMoveClock = parseInt(piecesOfFEN[4])
			fullMoveNumber = parseInt(piecesOfFEN[5])
		}
	}

	this.getCurrentFEN = function(){
		return history[timeTravelIndex]
	}

	this.newGame = function(){
		currentPosition = this.getStartingPosition()

		startingFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

		validMoveAttempt = true

		pgn = []
		history = [startingFEN]
		timeTravelIndex = 0;
		timeTravelArray = [...currentPosition]

		castlingRestrictions = {
			white: {
				canCastleKingside: true,
				canCastleQueenside: true
			},
			black: {
				canCastleKingside: true,
				canCastleQueenside: true
			}
		}

		enPassantTargetIndex = null;

		isWhitesTurn = true;

		fullMoveNumber = 1;
		halfMoveClock = 0;
	}

	this.startWithFEN = function(fen){
		this.newGame();
		let fenArray = fen.split(" ")

		let pieceString = fenArray[0]
		
		let boardArrayFromFen = ConvertFENtoBoardArray(fen)

		if(boardArrayFromFen !== false){
			currentPosition = boardArrayFromFen

			isWhitesTurn = fenArray[1] === "w" ? true : false

			let castlingFENArray = fenArray[2].split("")
			let castlingFENObj = {
				white: {
					canCastleKingside: castlingFENArray.indexOf("K") !== -1,
					canCastleQueenside: castlingFENArray.indexOf("Q") !== -1
				},
				black: {
					canCastleKingside: castlingFENArray.indexOf("k") !== -1,
					canCastleQueenside: castlingFENArray.indexOf("q") !== -1
				}
			}

			castlingRestrictions = castlingFENObj
			
			let enPassantFENSquare = fenArray[3];

			let enPassantFENIndex;
			if(enPassantFENSquare === "-"){
				enPassantFENIndex = null
			}else{
				enPassantFENIndex = ConvertSquareNameToIndex(enPassantFENSquare);
			}
			
			enPassantTargetIndex = enPassantFENIndex;

			halfMoveClock = parseInt(fenArray[4])
			fullMoveNumber = parseInt(fenArray[5])

			startingFEN = fen

			history = [this.getStartingFen()]

			timeTravelArray = this.getCurrentPosition()
		}
	}

	this.readPGN = function(pgn){
		//remove annotations
		pgn = pgn.replace(/{[^}]+}/g, "")
		         .replace(/\([^)]+\)/g, "")
		         .replace(/\d+\./g, "")
		         .replace(/[!?.]/g, "")
		
		let pgnArray = pgn.split(/\s/);
		pgnArray = pgnArray.filter(x => x.length > 1)
		pgnArray.pop();

		return pgnArray
	}

	this.processPGNArray = function(pgnArray){
		let indexArray = []
		for(let i=0; i<pgnArray.length; i++){
			let piece = pgnArray[i][0].toUpperCase() === "O" ? pgnArray[i] : pgnArray[i][0]
			if(piece[0].toUpperCase() !== 'O'){
				let targetSquare = pgnArray[i].match(/[a-hA-H]\d/)[0]
				targetSquare = ConvertSquareNameToIndex(targetSquare)
				if(piece.match(/[a-hAC-H]/)){
					piece = "p"
				}
				piece = i%2===0 ? piece.toUpperCase() : piece.toLowerCase()
				let pieceArray = currentPosition.map((x,i) => {return {piece: x, index: i}}).filter(x => x.piece === piece)
				for(let j=0; j<pieceArray.length; j++){
					let validSquares = findValidSquares(currentPosition, piece, pieceArray[j].index, enPassantTargetIndex)
					if(pgnArray[i].match(/[a-zA-Z]([a-hA-H]|\d)x{0,1}[a-hA-H]\d/)){
						let columnOrRow = pgnArray[i].match(/[a-zA-Z]([a-hA-H]|\d)x{0,1}[a-hA-H]\d/)[1]
						let rowParam = Math.floor((63 - pieceArray[j].index) / 8) + 1
						let columnParam = (pieceArray[j].index % 8)  + 1
						let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
						columnParam = letters[columnParam -1]

						if(isNaN(parseInt(columnOrRow))){
							if(columnOrRow === columnParam){
								if(validSquares.indexOf(targetSquare) !== -1){
									this.processMove(pieceArray[j].index, targetSquare)
									if(validMoveAttempt){
										indexArray.push([pieceArray[j].index, targetSquare])
									}else{
										return "invalid move in pgn"
									}
								}
							}
						}else{
							if(parseInt(columnOrRow) === rowParam){
								if(validSquares.indexOf(targetSquare) !== -1){
									this.processMove(pieceArray[j].index, targetSquare)
									if(validMoveAttempt){
										indexArray.push([pieceArray[j].index, targetSquare])
									}else{
										return "invalid move in pgn"
									}
								}
							}
						}
					}else if(pgnArray[i].match(/[a-h]x[a-h]\d{1}/)){
						let columnLetter = pgnArray[i][0]
						let columnParam = (pieceArray[j].index % 8)  + 1
						let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
						columnParam = letters[columnParam -1]
						if(columnLetter === columnParam){
							if(validSquares.indexOf(targetSquare) !== -1){
								this.processMove(pieceArray[j].index, targetSquare)
								if(validMoveAttempt){
									indexArray.push([pieceArray[j].index, targetSquare])
								}else{
									return "invalid move in pgn"
								}
							}
						}
					}else{
						if(validSquares.indexOf(targetSquare) !== -1){
							this.processMove(pieceArray[j].index, targetSquare)
							if(validMoveAttempt){
								indexArray.push([pieceArray[j].index, targetSquare])
							}else{
								return "invalid move in pgn"
							}
						}
					}
				}
			}else{
				piece = piece.toUpperCase();
				let coefficient = 0;
				if(piece === 'O-O'){
					coefficient = 2
				}else if(piece === 'O-O-O'){
					coefficient = -2;
				}
				
				let king = i%2===0 ? 'K' : 'k';
				
				this.processMove(currentPosition.indexOf(king), currentPosition.indexOf(king) + coefficient)

				if(validMoveAttempt){
					indexArray.push([currentPosition.indexOf(king), currentPosition.indexOf(king) + coefficient])
				}else{
					return "invalid move in pgn"
				}
			}
		}

		return indexArray
	}

	this.startWithPGN = function(pgn){
		this.newGame();

		let pgnArray = this.readPGN(pgn);
		this.processPGNArray(pgnArray);

		timeTravelIndex = 1
		currentPosition = ConvertFENtoBoardArray(history[timeTravelIndex]);
	}

	this.isCastling = function(piece, startingIndex, endingIndex){
		if((piece === "k" && startingIndex === 4) || (piece === "K" && startingIndex === 60)){
			if(startingIndex - endingIndex === 2 ||
			   startingIndex - endingIndex === 3 ||
			   startingIndex - endingIndex === 4 ||
			   startingIndex - endingIndex === -2 ||
			   startingIndex - endingIndex === -3){
				return true
			}else{
				return false
			}
		}else{
			return false
		}
	}

	this.processMove = (startingIndex, endingIndex) => {
		startingIndex = parseInt(startingIndex);
		endingIndex = parseInt(endingIndex);
		let capture;

		let piece = this.whatsInSquare(startingIndex)

		if(isWhitesTurn === (piece.charCodeAt(0) <= 90)){
			let validSquares = findValidSquares(currentPosition, piece, startingIndex, enPassantTargetIndex)		

			if(this.isCastling(piece, startingIndex, endingIndex)){
				let castledSquares = checkForCastling(currentPosition, startingIndex, endingIndex, piece, castlingRestrictions)
				if(castledSquares !== false){
					currentPosition = castledSquares.slice();
					if(isWhitesTurn){
						castlingRestrictions.white.canCastleKingside = false
						castlingRestrictions.white.canCastleQueenside = false
					}else{
						castlingRestrictions.black.canCastleKingside = false
						castlingRestrictions.black.canCastleQueenside = false
					}
					validMoveAttempt = true
					enPassantTargetIndex = null

					if(startingIndex > endingIndex){
						pgn.push(this.addToPGN("O-O-O"))
					}else{
						pgn.push(this.addToPGN("O-O"))
					}

					if(!isWhitesTurn){
						fullMoveNumber += 1;
					}

					halfMoveClock += 1;

					this.endTurn();

					history.push(ConvertBoardArrayToFEN(currentPosition, isWhitesTurn, castlingRestrictions, enPassantTargetIndex, halfMoveClock, fullMoveNumber))
					timeTravelIndex = history.length - 1;
					timeTravelArray = currentPosition
					

				}else{
					validMoveAttempt = false
				}
			}else{
				if(validSquares.indexOf(parseInt(endingIndex)) !== -1){
					let positionBeforeMove = currentPosition.slice();
					let targetSquarePiece = positionBeforeMove[endingIndex];
					currentPosition[startingIndex] = null;
					currentPosition[endingIndex] = piece;
					let kingInCheck = false
					if(isWhitesTurn){
						kingInCheck = InCheck(currentPosition, currentPosition.indexOf("K"), "K")
					}else{
						kingInCheck = InCheck(currentPosition, currentPosition.indexOf("k"), "k")
					}

					if(!kingInCheck){
						validMoveAttempt = true
						capture = targetSquarePiece !== null ? true : false;
						if(piece === "r" || piece === "R" || piece === "k" || piece === "K"){
							this.updateCastingRestrictions(piece, startingIndex)
						}

						if(piece === "p" && endingIndex === enPassantTargetIndex){
							currentPosition[endingIndex - 8] = null;
							capture = true;
						}else if(piece === "P" && endingIndex === enPassantTargetIndex){
							currentPosition[endingIndex + 8] = null;
							capture = true;
						}

						if(piece === "p" && endingIndex - startingIndex === 16){
							enPassantTargetIndex = startingIndex + 8
						}else if(piece === "P" && endingIndex - startingIndex === -16){
							enPassantTargetIndex = startingIndex - 8
						}else{
							enPassantTargetIndex = null
						}
						
						if(piece === "p" && (endingIndex >=56 && endingIndex <=63)){
							currentPosition[endingIndex] = "q"
						}else if(piece === "P" && (endingIndex >=0 && endingIndex <=7)){
							currentPosition[endingIndex] = "Q"
						}

						let pgnCheck;
						let pgnCheckMate;
						let pgnResult = "";

						if(isWhitesTurn){
							if(InCheck(currentPosition, currentPosition.indexOf('k'), 'k')){
								if(InCheckmate(currentPosition, 'k')){
									pgnCheckMate = true;
									pgnResult = "1-0"
								}else{
									pgnCheck = true;
								}
							}else{
								if(InCheckmate(currentPosition, 'k')){
									pgnResult = "1/2-1/2"
								}
							}
						}else{
							if(InCheck(currentPosition, currentPosition.indexOf('K'), 'K')){
								if(InCheckmate(currentPosition, 'K')){
									pgnCheckMate = true;
									pgnResult = "0-1"
								}else{
									pgnCheck = true;
								}
							}else{
								if(InCheckmate(currentPosition, 'K')){
									pgnResult = "1/2-1/2"
								}
							}
						}		

						pgn.push(this.addToPGN(piece, startingIndex, endingIndex, capture, pgnCheck, pgnCheckMate, pgnResult))
						
						if(!isWhitesTurn){
							fullMoveNumber += 1;
						}

						if(piece === 'p' || piece === 'P'){
							halfMoveClock = 0;
						}else if(capture){
							halfMoveClock = 0;
						}else{
							halfMoveClock += 1;
						}

						this.endTurn();

						history.push(ConvertBoardArrayToFEN(currentPosition, isWhitesTurn, castlingRestrictions, enPassantTargetIndex, halfMoveClock, fullMoveNumber))
						timeTravelIndex = history.length - 1;
						timeTravelArray = currentPosition;


					}else{
						currentPosition = positionBeforeMove
						validMoveAttempt = false
					}
				}else{
					validMoveAttempt = false
				}
			}
		}else{
			validMoveAttempt = false;
		}
	}
}