import { Action } from "@ngrx/store";

export const SWITCH_RIGHT = 'Change_State';

export class ChangeState implements Action {
    readonly type = SWITCH_RIGHT;
    
    constructor(public payload: boolean) { }

    
}
export type All = ChangeState; 