## Effects

An effect is a type of Angular service, so at its core it should just look like any other Angular service with that injectable decorator on top of a TypeScript class, except by convention, we'll call it ProductEffects versus ProductService.

- step-1:
  inject the Actions observable from the NgRx library which emits an action every time one is dispatched in our application.
- step-2:
  create an effect by making a variable, filter out the actions we are not interested in, except for our load action.
  @Effect()
  loadProducts$ = this.actions$.pipe(
  ofType(productActions.ProductActionType.LOAD),
  mergeMap((action: productActions.Load) => this.productService.getProducts()
  .pipe(
  map((products: Product[]) => new productActions.LoadSuccess(products))
  ))
  );
  MergeMap maps over every emitted action calling Angular services who return observables, then merges these observables into a single stream. So next we call our injected productService's getProducts method, which will call our server and return an array of products or an error.
  As our service returns an observable of products, we'll need to use another pipe with a map operator to map over the emitted products array and return a LoadSuccess action with the products as its payload.

  - step-3:
    Register EffectsModule both appmodule and featured module

### Using Effects:

- step-1:
  dispatch an action, passing along a created action.
  **this.store.dispatch(new productActions.Load());**
- step-2:
  Finally, we will need to swap out our call to the Angular service to getProducts, with a subscription to the store, selecting our products with a getProducts selector.
  **this.store.pipe(select(fromProduct.getProducts)).subscribe((products: Product[]) => this.products = products);**

#### Unsubscribing Obserable

Using unsubscribiption:
set initial value of componentActive=true when intialize the component
this.store.pipe(select(fromProduct.getProducts),
// use for unsubscribing
takeWhile(() => this.componentActive)
).subscribe((products: Product[]) => this.products = products);

     ngOnDestroy(): void {
    this.componentActive = false;

}

###### Using async pipe:
