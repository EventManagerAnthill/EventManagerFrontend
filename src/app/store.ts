import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import signInReducer from '../features/signIn/signInSlice';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

// let sagaMiddleware = createSagaMiddleware();
// const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

// export const store = configureStore({
//   reducer: {
//     signIn: signInReducer,
//   },
//   middleware
// });

// sagaMiddleware.run(rootSaga);

export function createStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
}

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;


