import { Product } from '../product';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as productActions from './product.actions';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) { }
    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionType.LOAD),
        mergeMap((action: productActions.Load) => this.productService.getProducts()
            .pipe(
                map((products: Product[]) => new productActions.LoadSuccess(products)),
                catchError(err => of(new productActions.LoadFail(err)))
            ))
    );
    @Effect()
    updateProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionType.UPDATE_PRODUCT),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) => this.productService.updateProduct(product).pipe(
            map(updateProduct => (new productActions.UpdateProductSuccess(updateProduct))),
            catchError(err => of(new productActions.UpdateProductFail(err)))
        ))
    );
}
