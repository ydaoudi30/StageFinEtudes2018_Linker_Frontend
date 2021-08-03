import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/connect.action';

import { ConnectedState } from '../states/connected.state';

export const initialState: ConnectedState = { connectedCustomer : false };

export function reducer(state = initialState, action: fromActions.All): ConnectedState {
    switch (action.type) {

        case fromActions.SWITCH_RIGHT: {
            return { connectedCustomer: action.payload };
        }
        default: {
            return state  ;
        }
    }
}

export const getConnectState = createFeatureSelector<ConnectedState>('connectedState');

export const getState = createSelector(
    getConnectState,
    (state: ConnectedState) => state.connectedCustomer
); 