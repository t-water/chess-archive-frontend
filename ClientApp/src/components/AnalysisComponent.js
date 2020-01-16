import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Game from './GameComponent';
import {PlayChess} from '../shared/ChessLogic';

class Analysis extends Component{
	constructor(props){
		super(props)

		this.chess = new PlayChess();
		
		this.state = {
			squares: this.chess.getCurrentPosition(),
			isWhitesTurn: this.chess.getIsWhitesTurn(),
			line: this.chess.getPGN(),
			boardFlipped: false,
		}

		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.handleDragStart = this.handleDragStart.bind(this)
		this.handleFENInput = this.handleFENInput.bind(this)
		this.handleResetButtonClick = this.handleResetButtonClick.bind(this)
		this.handleFlipBoardClick = this.handleFlipBoardClick.bind(this)
		this.handleKeyDown = this.handleKeyDown.bind(this)
		this.handleArrowButtonClick = this.handleArrowButtonClick.bind(this)
		this.setStateToTimeTravelResult = this.setStateToTimeTravelResult.bind(this)
		this.renderMovesForLine = this.renderMovesForLine.bind(this)
		this.handleMoveClick = this.handleMoveClick.bind(this)
		this.handlePGNSubmit = this.handlePGNSubmit.bind(this)
	}

	handleMouseDown(e, calledFrom){
		let image = ReactDOM.findDOMNode(calledFrom)
		image.style.position = 'absolute';
		image.style.zIndex = 1000;

		moveAt(e.pageX, e.pageY);

		function moveAt(pageX, pageY) {
			let offsetTop = document.querySelector('.row').offsetTop
			console.log(offsetTop)
			let offsetLeft = document.querySelector('.container').offsetLeft
			image.style.left = pageX - image.offsetWidth / 2 - offsetLeft + 'px';
			image.style.top = pageY - image.offsetHeight / 2 - offsetTop + 'px';
		}
		
		let currentDropable = null;
		let targetSquareIndex;
		let draggedPiece = calledFrom;
		let game = this;

		function onMouseMove(e) {
			moveAt(e.pageX, e.pageY);

			image.hidden = true;
			let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
			image.hidden = false;

			if (!elemBelow) return;

			let droppableBelow = elemBelow.closest('.droppable');
			if (this.currentDroppable !== droppableBelow && droppableBelow !== null) {
				if (this.currentDroppable) {
					targetSquareIndex = droppableBelow.dataset.index
				}
				this.currentDroppable = droppableBelow;
			}	
		}

		document.addEventListener('mousemove', onMouseMove);

		image.onmouseup = function() {
			game.chess.setCurrentPosition(game.chess.getTimeTravelArray())
			game.chess.setHistory(game.chess.getHistory().slice(0, game.chess.getTimeTravelIndex() + 1))
			game.chess.setPGN(game.chess.getPGN().slice(0, game.chess.getTimeTravelIndex()))
			game.chess.processMove(draggedPiece.props.index, targetSquareIndex)
			if(game.chess.getValidMoveAttempt()){
				if(game.state.boardFlipped){
					game.setState({
						squares: game.chess.getCurrentPosition().reverse(),
						isWhitesTurn: game.chess.getIsWhitesTurn(),
						line: game.chess.getPGN()
					})
				}else{
					game.setState({
						squares: game.chess.getCurrentPosition(),
						isWhitesTurn: game.chess.getIsWhitesTurn(),
						line: game.chess.getPGN()
					})
				}
			}else{
				let squares = game.chess.getCurrentPosition()
				let piece = squares[draggedPiece.props.index]
				squares[draggedPiece.props.index] = null
				if(game.state.boardFlipped){
					game.setState({
						squares: squares.slice().reverse()
					})
				}else{
					game.setState({
						squares: squares.slice()
					})
				}

				squares[draggedPiece.props.index] = piece
				if(game.state.boardFlipped){
					game.setState({
						squares: squares.slice().reverse()
					})
				}else{
					game.setState({
						squares: squares.slice()
					})
				}
			}

			document.removeEventListener('mousemove', onMouseMove);
			image.onmouseup = null;
		};
	}

	handleDragStart(e){
		e.preventDefault();
	}

	handleFENInput(){
		let input = document.getElementById('analysis-component-fen-textarea')
		let fen = input.textContent.trim();
		this.chess.startWithFEN(input.value)
		this.setState({
			squares: this.chess.getCurrentPosition(),
			isWhitesTurn: this.chess.getIsWhitesTurn(),
			boardFlipped: false,
			line: this.chess.getPGN()
		})
	}

	handleResetButtonClick(){
		let input = document.getElementById('analysis-component-fen-textarea')
		input.value = "";
		this.chess.newGame();
		this.setState({
			squares: this.chess.getCurrentPosition(),
			isWhitesTurn: this.chess.getIsWhitesTurn(),
			boardFlipped: false,
			line: this.chess.getPGN()
		})
	}

	handleFlipBoardClick(){
		this.setState((state, props) => ({
			squares: state.squares.slice().reverse(),
			boardFlipped: !state.boardFlipped
		}))
	}

	handleKeyDown(e){
		let timeTravelIndex = this.chess.getTimeTravelIndex()
		if(e.key === "ArrowLeft"){
			setTimeout(() => {
				this.chess.timeTravel(timeTravelIndex - 1)
				this.setStateToTimeTravelResult()
			}, 150)
		}else if(e.key === "ArrowRight"){
			setTimeout(() => {
				this.chess.timeTravel(timeTravelIndex + 1)
				this.setStateToTimeTravelResult()
			}, 150)
		}else if(e.key === "ArrowUp"){
			e.preventDefault();
			this.chess.timeTravel(0)
			this.setStateToTimeTravelResult()
		}else if(e.key === "ArrowDown"){
			e.preventDefault();
			this.chess.timeTravel(this.chess.getHistory().length - 1)
			this.setStateToTimeTravelResult()
		}
	}

	handleArrowButtonClick(i){
		setTimeout(() => {
			this.chess.timeTravel(this.chess.getTimeTravelIndex() + i)
			this.setStateToTimeTravelResult()
		}, 150)
	}

	setStateToTimeTravelResult(){
		if(this.state.boardFlipped){
			this.setState({
				squares: this.chess.getTimeTravelArray().reverse(),
				isWhitesTurn: this.chess.getIsWhitesTurn()
			})
		}else{
			this.setState({
				squares: this.chess.getTimeTravelArray(),
				isWhitesTurn: this.chess.getIsWhitesTurn()
			})
		}
	}

	renderMovesForLine(timeTravelIndex){
		return this.state.line.map((x,i) => {
			let highlighted = timeTravelIndex - 1 === i ? "bg-warning" : ""
			return <span key={`move: ${i}`}
						 onClick={() => this.handleMoveClick(i)}
						 className={"analysis-component-line-span " + highlighted}>{x}
				   </span>
		})
	}

	handleMoveClick(i){
		this.chess.timeTravel(i+1);
		this.setStateToTimeTravelResult()
	}

	async handlePGNSubmit(e) {
		e.preventDefault();
		let formData = new FormData();
		let input = document.getElementById('analysis-component-pgn-textarea');
		formData.append(input.name, input.value)
		let response = await fetch('/pgn/submittext', {
			method: 'POST',
			body: formData
		});
		let data = await response.json();
		if(data.hasOwnProperty("Error")){
			document.getElementById('pgn-error-span').innerText = data.Error
		}else{
			document.getElementById('pgn-error-span').innerText = ''
			input.value = ""
			this.chess.startWithPGN(data.Moves)
			this.setState({
				squares: this.chess.getCurrentPosition(),
				isWhitesTurn: this.chess.getIsWhitesTurn(),
				line: this.chess.getPGN()
			})
		}
	}

	componentDidMount() {
	    document.addEventListener("keydown", this.handleKeyDown, false);
	}
	componentWillUnmount(){
	    document.removeEventListener("keydown", this.handleKeyDown, false);
	}
	
	render(){
		let line = this.renderMovesForLine(this.chess.getTimeTravelIndex())
		return(
			<div className="row">
				<div className="col-12 col-lg-5 text-center">
					<h1 className="text-center">Analysis Board</h1>
					<small>Use Arrow Keys or Arrow Buttons to View Moves</small>
					<Game fen = {this.state.fen}
							  squares={this.state.squares}
							  isWhitesTurn={this.state.isWhitesTurn}
							  boardFlipped={this.state.boardFlipped}
							  handleMouseDown={this.handleMouseDown}
							  handleDragStart={this.handleDragStart}/>
					<div className="form-group mt-1">
						<button className="btn btn-danger m-1"
								onClick={() => this.handleArrowButtonClick(-1)}>
								&larr;
						</button>
						<button className="btn btn-warning m-1" 
								onClick={this.handleResetButtonClick}>
								Reset
						</button>
						<button className="btn btn-primary m-1" 
								onClick={this.handleFlipBoardClick}>
								Flip Board
						</button>
						<button className="btn btn-danger m-1"
								onClick={() => this.handleArrowButtonClick(1)}>
								&rarr;
						</button>
					</div>
					<div className="form-group mt-1">

					</div>
				</div>
				<div className="col-12 col-lg-7">
					<h2 className="mt-3">Paste FEN Here</h2>
					<input id="analysis-component-fen-textarea" className="form-control" onInput={this.handleFENInput} />
					<div><input className="form-control"
								value={this.chess.getCurrentFEN()}
								maxLength="100"
					            readOnly  /></div>
					<h2>Paste PGN Here</h2>
					<form onSubmit={this.handlePGNSubmit}
						  id="pgn-form"
						  method="post">
						<div className="form-group">
							<textarea id="analysis-component-pgn-textarea"
								      className="form-control"
								      name="Pgn"
									  rows="5"
								      maxLength="5000">
							</textarea>
							<span className="text-danger"
								  id="pgn-error-span"></span>
						</div>
						<div className="form-group">
							<button type="submit" className="btn btn-primary">Submit</button>
						</div>
					</form>
					<div id="analysis-board-line">{line}</div>
				</div>
			</div>
		)
	}
}

export default Analysis