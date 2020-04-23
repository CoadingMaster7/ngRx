import * as fromRoot from './../../state/app.state';
import { Product } from '../product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionType } from './product.actions';

export interface State extends fromRoot.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
    error: string;
}
const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: [],
    error: ''
};
const getProsuctFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(
    getProsuctFeatureState,
    state => state.showProductCode
);

export const getCurrentProduct = createSelector(
    getProsuctFeatureState,
    state => state.currentProduct
);
export const getProducts = createSelector(
    getProsuctFeatureState,
    state => state.products
);
export const getErrors = createSelector(
    getProsuctFeatureState,
    state => state.error
);

export function reducer(state = initialState, action: ProductActions): ProductState {
    // console.log('existing state', JSON.stringify(state));
    // console.log('payload', action.payload);
    switch (action.type) {
        // action
        case ProductActionType.TOGGLE_PRODUCT_CODE: {
            return {
                // this 3 dots are javascript spreed syntax avaiable for use with arrays or object literals.
                ...state,
                // store(state)
                showProductCode: action.payload
            };
        }
        case ProductActionType.SET_CURRENT_PRODUCT: {
            return {
                ...state,
                currentProduct: { ...action.payload }
            };
        }
        case ProductActionType.CLEAR_CURRENT_PRODUCT: {
            return {
                ...state,
                currentProduct: null
            };
        }
        case ProductActionType.INITIALIZE_CURRENT_PRODUCT: {
            return {
                ...state,
                currentProduct: {
                    id: 0,
                    productName: '',
                    productCode: 'new',
                    description: '',
                    starRating: 0
                }
            };
        }
        case ProductActionType.LOAD_SUCCESS: {
            return {
                ...state,
                products: action.payload,
                error: ''
            };
        }
        case ProductActionType.LOAD_FAIL: {
            return {
                ...state,
                products: [],
                error: action.payload
            };
        }
        default:
            return state;
    }
}
