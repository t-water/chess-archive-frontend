import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Players } from './players';
import { Games } from './games';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			players: Players,
			games: Games
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
}