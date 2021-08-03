import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from '../actions/cart.action';
import { CartState } from '../states/cart.state';

export const initialState: CartState = { numberArticle : 0 };

export function reducer(state = initialState, action: fromActions.All): CartState {
    switch (action.type) {

        case fromActions.ADD_ARTICLES: {
            return { numberArticle: action.payload };
        }
        default: {
            return state  ;
        }
    }
}

export const getCartState = createFeatureSelector<CartState>('cartState');

export const getCartNbArticles = createSelector(
    getCartState,
    (state: CartState) => state.numberArticle
); 