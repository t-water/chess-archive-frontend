import React, { Component } from 'react';
import Game from './GameComponent';
import {PlayChess} from '../shared/ChessLogic';

function RenderDetailsTable({game}){
	return(
		<div className="table-responsive mt-5">
			<table className="table table-striped">
				<tbody>
					<tr>
						<th>White</th>
						<td>{game.WhitePlayer.FullName}</td>
					</tr>
					<tr>
						<th>Black</th>
						<td>{game.BlackPlayer.FullName}</td>
					</tr>
					<tr>
						<th>Event</th>
						<td>{game.Event}</td>
					</tr>
					<tr>
						<th>Round</th>
						<td>{game.Round}</td>
					</tr>
					<tr>
						<th>Result</th>
						<td>{game.Result}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

class ViewGame extends Component{
	constructor(props){
		super(props)

		this.chess = new PlayChess();
		
		this.state = {
			squares: [],
			isWhitesTurn: true,
			line: [],
			boardFlipped: false,
		}

		this.handleResetButtonClick = this.handleResetButtonClick.bind(this)
		this.handleFlipBoardClick = this.handleFlipBoardClick.bind(this)
		this.handleKeyDown = this.handleKeyDown.bind(this)
		this.handleDragStart = this.handleDragStart.bind(this)
		this.setStateToTimeTravelResult = this.setStateToTimeTravelResult.bind(this)
		this.renderMovesForLine = this.renderMovesForLine.bind(this)
		this.handleMoveClick = this.handleMoveClick.bind(this)
		this.handleArrowButtonClick = this.handleArrowButtonClick.bind(this)
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

	handleDragStart(e){
		e.preventDefault();
	}

	handleArrowButtonClick(i){
		setTimeout(() => {
			this.chess.timeTravel(this.chess.getTimeTravelIndex() + i)
			this.setStateToTimeTravelResult()
		}, 150)
	}

	componentDidMount(){
	    document.addEventListener("keydown", this.handleKeyDown, false);
	    if(this.props.game){
			this.chess.startWithPGN(this.props.game.Moves)
			this.setState({
				squares: this.chess.getCurrentPosition(),
				isWhitesTurn: this.chess.getIsWhitesTurn(),
				line: this.chess.getPGN()
			})
	    }
	}
	componentWillUnmount(){
	    document.removeEventListener("keydown", this.handleKeyDown, false);
	}
	
	render(){
		if(this.props.isLoading){
			return <h4 className="text-center">...Loading</h4>
		}else if(this.props.errMess){
			return (
				<div className="text-center">
					<h2>Error Loading Game</h2>
					<a href="/home">Return Home</a>
				</div>
			)
		}else if(!this.props.game){
			return (
				<div className="text-center">
					<h2>Game Not Found</h2>
					<a href="/home">Return Home</a>
				</div>
			)
		}else{
			let line = this.renderMovesForLine(this.chess.getTimeTravelIndex())
			return(
				<div className="row">
					<div className="col-12 col-lg-5 text-center">
						<h1 className="text-center">Analysis Board</h1>
						<small>Use Arrow Keys or Arrow Buttons to View Moves</small>
						<Game squares={this.state.squares}
							  isWhitesTurn={this.state.isWhitesTurn}
							  boardFlipped={this.state.boardFlipped}
							  handleDragStart={this.handleDragStart}/>
						<div className="form-group mt-1">
							<button className="btn btn-danger m-1" 
									onClick={() => this.handleArrowButtonClick(-1)}>
								&larr;
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
					</div>
					<div className="col-12 col-lg-7">
						<div>
							<input className="form-control mb-2"
										value={this.chess.getCurrentFEN()}
										maxLength="100"
							            readOnly  />
			            </div>
						<div id="analysis-board-line">{line}</div>
						<RenderDetailsTable game={this.props.game}/>
					</div>
				</div>
			)
		}
	}
}

export default ViewGame