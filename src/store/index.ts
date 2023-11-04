/**
 * Store
 *
 * @see https://redux.js.org/usage/configuring-your-store
 * @see https://redux.js.org/tutorials/typescript-quick-start
 *
 * sobird<i@sobird.me> at 2023/05/08 23:11:10 created.
 */

// import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch }from 'redux-thunk';
import reducers from './reducers';
import logger from './middleware/logger';

// const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const reducer = combineReducers(reducers);
// const store = createStoreWithMiddleware(reducer);
// const store = createStore(combineReducers(reducers), composeWithDevTools(applyMiddleware(thunk, logger)));

const store = configureStore({
  reducer: reducers,
  middleware: [thunk.withExtraArgument('thunk'), logger],
  devTools: process.env.NODE_ENV !== 'production',
  // enhancers: []
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<string, number, any>;

export default store;
