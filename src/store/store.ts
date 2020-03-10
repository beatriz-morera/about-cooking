import { configureStore } from '@reduxjs/toolkit';
//import persistState from 'redux-localstorage';  StoreEnhancer

import * as categories from './features/categoriesSlice';
import * as featured from './features/featuredSlice';

export interface State {
  categories: categories.State;
  featured: featured.State;
}

export default configureStore<State>({
  reducer: {
    categories: categories.reducer,
    featured: featured.reducer
  }
  //enhancers: [persistState() as StoreEnhancer]
});
