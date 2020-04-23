import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionType {
    TOGGLE_PRODUCT_CODE = '[Products toggle]TOGGLE PRODUCT CODE',
    SET_CURRENT_PRODUCT = '[Products]SET CURRENT PRODUCT',
    CLEAR_CURRENT_PRODUCT = '[Products]CLEAR CURRENT PRODUCT',
    INITIALIZE_CURRENT_PRODUCT = '[Products]INITIALIZE CURRENT PRODUCT',
    /* complex operation */
    LOAD = '[Load Products]Load Products',
    LOAD_SUCCESS = '[Products load success]Load success',
    LOAD_FAIL = '[Products Load fail] Load Fail'
}
export class ToggleProductCode implements Action {
    readonly type = ProductActionType.TOGGLE_PRODUCT_CODE;
    constructor(public payload: boolean) { }
}
export class SetCurrentProduct implements Action {
    readonly type = ProductActionType.SET_CURRENT_PRODUCT;
    constructor(public payload: Product) { }
}
export class ClearCurrentProduct implements Action {
    readonly type = ProductActionType.CLEAR_CURRENT_PRODUCT;
    // no payload
    constructor() { }
}
export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionType.INITIALIZE_CURRENT_PRODUCT;
    // no payload so we can remove constructor
}
export class Load implements Action {
    readonly type = ProductActionType.LOAD;
    // no payload so we can remove constructor
}
export class LoadSuccess implements Action {
    readonly type = ProductActionType.LOAD_SUCCESS;
    constructor(public payload: Product[]) { }
}
export class LoadFail implements Action {
    readonly type = ProductActionType.LOAD_FAIL;
    // no payload so we can remove constructor
    constructor(public payload: string) { }
}




export type ProductActions = ToggleProductCode | SetCurrentProduct | ClearCurrentProduct | InitializeCurrentProduct
    | Load | LoadSuccess | LoadFail;
