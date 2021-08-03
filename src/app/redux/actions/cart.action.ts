import { Action } from "@ngrx/store";

export const ADD_ARTICLES = 'Add_To_Cart_Articles';

export class AddToCartArticleAction implements Action {
    readonly type = ADD_ARTICLES;
    
    constructor(public payload: number) { }

    
}
export type All = AddToCartArticleAction; 