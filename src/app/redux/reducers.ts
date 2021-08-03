import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from './states/app.state';
import * as cartReducer from './reducers/cart.reducer';
import * as connectedReducer from './reducers/connect.reducer';
import { environment } from '../../environments/environment';

export const reducers: ActionReducerMap<AppState> = {
    cartState: cartReducer.reducer,
    connectedState: connectedReducer.reducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
	return function (state: AppState, action: any): AppState {
		console.log('state', state);
		console.log('action', action);
		return reducer(state, action);
	};
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : []; 