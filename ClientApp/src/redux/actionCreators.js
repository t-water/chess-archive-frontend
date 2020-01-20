import * as actionTypes from './actionTypes';
import SERVER_BASE_URL from '../shared/ServerBaseUrl'

export const fetchPlayers = () => (dispatch) => {
	dispatch(playersLoading(true));

	return fetch(SERVER_BASE_URL + '/player/getPlayers')
		       .then(response => {
		       		if(response.ok){
		       			return response
		       		}else{
		       			var error = new Error('Error ' + response.status + ': ' + response.statusText);
		       			error.response = response;
		       			throw error;
		       		}
		       }, 
		       error => {
		           var errmess = new Error(error.message);
		           throw errmess;
		       })
		       .then(response => response.json())
		       .then(players => dispatch(addPlayers(players)))
		       .catch(error => dispatch(playersFailed(error.message)));
}

export const playersLoading = () => ({
	type: actionTypes.PLAYERS_LOADING
});

export const playersFailed = (errmess) => ({
	type: actionTypes.PLAYERS_FAILED,
	payload: errmess
})

export const addPlayers = (players) => ({
	type: actionTypes.ADD_PLAYERS,
	payload: players
})

export const fetchGames = () => (dispatch) => {
	dispatch(gamesLoading(true));

	return fetch(SERVER_BASE_URL + '/pgn/getGames')
		       .then(response => {
		       		if(response.ok){
		       			return response
		       		}else{
		       			var error = new Error('Error ' + response.status + ': ' + response.statusText);
		       			error.response = response;
		       			throw error;
		       		}
		       }, 
		       error => {
		           var errmess = new Error(error.message);
		           throw errmess;
		       })
		       .then(response => response.json())
		       .then(games => dispatch(addGames(games)))
		       .catch(error => dispatch(gamesFailed(error.message)));
}

export const gamesLoading = () => ({
	type: actionTypes.GAMES_LOADING
});

export const gamesFailed = (errmess) => ({
	type: actionTypes.GAMES_FAILED,
	payload: errmess
})

export const addGames = (games) => ({
	type: actionTypes.ADD_GAMES,
	payload: games
})