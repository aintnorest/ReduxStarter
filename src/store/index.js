import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer  from 'reducers';
import thunk        from 'redux-thunk';
import DevTools     from 'components/LogMonitor';

export default function configureStore (initialState, debug = false) {
  let createStoreWithMiddleware;

  const middleware = applyMiddleware(thunk);

  if (debug) {
    createStoreWithMiddleware = compose(middleware, DevTools.instrument());
  } else {
    createStoreWithMiddleware = compose(middleware);
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );

  return store;
}
