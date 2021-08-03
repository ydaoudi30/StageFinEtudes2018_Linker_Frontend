import { CartState } from './cart.state';
import { ConnectedState } from './connected.state';

export interface AppState {
    cartState: CartState;
    connectedState : ConnectedState;
}