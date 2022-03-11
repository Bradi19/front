import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../store/reducers/rootReducer";

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );

  if (module.hot) {
    module.hot.accept("../store/reducers/rootReducer", () => {
      const nextRootReducer = require("../store/reducers/rootReducer");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
