import { Component, OnInit, OnDestroy } from '@angular/core';


import { Product } from '../product';
import { ProductService } from '../product.service';
/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/products.reducer';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  componentActive = true;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;


  constructor(private store: Store<fromProduct.State>, private productService: ProductService) { }

  ngOnInit(): void {
    // ToDO unsubscribe
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.errorMessage$ = this.store.pipe(select(fromProduct.getErrors));
    this.store.dispatch(new productActions.Load());
    //
    this.products$ = this.store.pipe(select(fromProduct.getProducts),
      // use for unsubscribing
      // takeWhile(() => this.componentActive)
    );
    // .subscribe((products: Product[]) => this.products = products);

    /* this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: (err: any) => this.errorMessage = err.error
    }); */
    /* Todo Unsubscribe */
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(showProductCode => this.displayCode = showProductCode);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(true));
    // this.displayCode = value;
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
