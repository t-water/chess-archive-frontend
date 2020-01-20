import * as actionTypes from './actionTypes';

export const Games = (state = {
		isLoading: true,
		errMess: null,
		games: []
	}, action) => {
	switch(action.type){
		case actionTypes.ADD_GAMES:
			return {...state, isLoading: false, errMess: null, games: action.payload}

		case actionTypes.GAMES_LOADING:
			return {...state, isLoading: true, errMess: null, games: []}

		case actionTypes.GAMES_FAILED:
			return {...state, isLoading: false, errMess: action.payload, games: []}

		default:
			return state;
	}
}