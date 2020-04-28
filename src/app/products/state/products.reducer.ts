import { ProductActionType, ProductActions } from './product.actions';
import { Product } from '../product';

/* State for this feature (Product) */
export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}
const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
};
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
                currentProductId: action.payload.id
            };
        }
        case ProductActionType.CLEAR_CURRENT_PRODUCT: {
            return {
                ...state,
                currentProductId: null
            };
        }
        case ProductActionType.INITIALIZE_CURRENT_PRODUCT: {
            return {
                ...state,
                currentProductId: 0
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
        case ProductActionType.UPDATE_PRODUCT_SUCCESS: {
            const updatededProduct = state.products.map(item => action.payload.id === item.id ? action.payload : item);
            return {
                ...state,
                products: updatededProduct,
                currentProductId: action.payload.id,
                error: ''
            };
        }
        case ProductActionType.UPDATE_PRODUCT_FAIL: {
            return {
                ...state,
                error: action.payload
            };
        }
        default:
            return state;
    }
}
