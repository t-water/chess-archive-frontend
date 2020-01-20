import * as actionTypes from './actionTypes';

export const Players = (state = {
		isLoading: true,
		errMess: null,
		players: []
	}, action) => {
	switch(action.type){
		case actionTypes.ADD_PLAYERS:
			return {...state, isLoading: false, errMess: null, players: action.payload}

		case actionTypes.PLAYERS_LOADING:
			return {...state, isLoading: true, errMess: null, players: []}

		case actionTypes.PLAYERS_FAILED:
			return {...state, isLoading: false, errMess: action.payload, players: []}

		default:
			return state;
	}
}