import React from 'react';
import Spinner from './SpinnerComponent'

function RenderPlayersTable({players, isLoading, errMess}){
	if(isLoading){
		return (<div className="text-center"><Spinner/></div>)
	}else if(errMess){
		return (<h4 className="text-center">Unable To Load Featured Players</h4>)
	}else{
		let rows = players.map((player,i) => {
			return <tr key={`row ${i}`}><td>{player.FullName}</td><td><a href={"/viewgames/" + player.PlayerId}>View Games</a></td></tr>
		})

		return(
			<div className="table-responsive">
				<table className="table table-striped mb-5">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">View Games</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		)
	}
}

function RenderGamesTable({games, isLoading, errMess}){
	if(isLoading){
		return (<div className="text-center"><Spinner/></div>)
	}else if(errMess){
		return (<h4 className="text-center">Unable To Load Featured Games</h4>)
	}else{
		let rows = games.map((game, i) => {
			return <tr key={`row ${i}`}><td>{game.Event}</td><td>{game.Round}</td><td><a href={"/game/" + game.Id}>View Game</a></td></tr>
		})

		return(
			<div className="table-responsive">
				<table className="table table-striped">
					<thead>
						<tr>
							<th scope="col">Event</th>
							<th scope="col">Round</th>
							<th scope="col">View Game</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			</div>
		)
	}
}

function Home(props){
	return (
		<div>
			<h1 className="mb-5">Welcome to the Chess Archive</h1>
			<h2 className="text-center">Featured Players</h2>
			<RenderPlayersTable players={props.players}
								isLoading={props.playersLoading}
								errMess={props.playersErrMess}/>
			<h2 className="text-center">Featured Games</h2>
			<RenderGamesTable games={props.games}
							  isLoading={props.gamesLoading}
							  errMess={props.gamesErrMess}/>
		</div>
	)
}


export default Home