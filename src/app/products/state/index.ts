import * as fromRoot from './../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './products.reducer';

export interface State extends fromRoot.State {
    products: ProductState;
}


const getProsuctFeatureState = createFeatureSelector<ProductState>('products');
export const getShowProductCode = createSelector(
    getProsuctFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProsuctFeatureState,
    state => state.currentProductId
);
export const getCurrentProduct = createSelector(
    getProsuctFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'new',
                description: '',
                starRating: 0
            };
        } else {
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
);
export const getProducts = createSelector(
    getProsuctFeatureState,
    state => state.products
);
export const getErrors = createSelector(
    getProsuctFeatureState,
    state => state.error
);