import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import DevTools from '../containers/DevTools';

let enhancer;
if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunkMiddleware);
} else {
  enhancer = compose(applyMiddleware(thunkMiddleware), DevTools.instrument());
}

const store = createStore(
  reducers,
  enhancer
);

export default store;
