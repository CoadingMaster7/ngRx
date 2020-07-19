import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../product';


/* NgRx */
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../../state';
import * as productActions from '../../state/product.actions';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {

  errorMessage: string;


  products: Product[];

  // Used to highlight the selected product in the list
  // componentActive = true;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;


  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    // ToDO unsubscribe
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));

    this.errorMessage$ = this.store.pipe(select(fromProduct.getErrors));
    this.store.dispatch(new productActions.Load());
    // get all products
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
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
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
