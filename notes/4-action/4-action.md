## Action

### Strongly Typed Action

- step-1:
  Defining an action type
  export enu ProductActionTypes{
  ToggleProductCode='[Product Page]Toggle Product Code'
  }
- step-2:
  Build an action Creator
  export class ToggleProductCode implements Action{
  readonly type=ProductActionTypes.ToggleProductCode;
  constructor(public payload:boolean){}
  }
- step-3:
  define a type that unions all of the action creator classes
  export type ProductActions= ToggleProductCode|...;

- step-4:
  using action creator to dispatch an action
  this.store.dispatch(new productActions.ToggleProductCode(true));

#### Note

When the user selects a product, we update the state to reflect a new currentProduct. We return our existing state, spread to copy over all of its properties and the new currentProduct set to the action payload. One important thing to note here, we are passing a reference to our currentProduct into the store. That means if we update a property of the object in our component, we mutate the product in the store as well. To prevent this, we make a copy of the object here, using the spread operator.
case ProductActionType.SET_CURRENT_PRODUCT: {
return {
...state,
currentProduct: { ...action.payload }
};
}

### Define Action for complex objects:
Sometimes our actions invoke more complex operations, such as calling a backend server to load, update, create, or delete entities. When defining an action for a more complex operation, a single action is often not enough.
When a component is initialized, such as our product-list. component, we retrieve the products for display from a backend server. Performing this operation the NgRx way means that the component dispatches a Load action. This action has no payload, as it is simply a request to load the data. the reducer processes this action, but since it has no data, it does not generate new state. Rather, it calls our product data service to issue an http get request to get the data. But recall that our reducer should be a pure function with no side effects. We'll deal with that in a moment. Since the HTTP request is asynchronous, at some later point in time, the data is returned from the server.  We dispatch another action. A LoadSuccess action with a payload containing the retrieved data. The reducer processes this action and the existing state to create new state and updates the store. The store then retains the full list of products. The component subscribes to this store through a selector, watching for changes to the list of products. It sees the change and updates its local property. Angular's change detection kicks in and the products appear in the list. We have should have an action for handling any error. 
**For complex operations, we often define three actions**
- one for the operation itself
- one of successful completion of the operation,
- and one for an error or failure. 
