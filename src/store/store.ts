import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import persistState from 'redux-localstorage';

import * as categories from './features/categoriesSlice';
import * as featured from './features/featuredSlice';
import * as recipe from './features/recipeSlice';
import * as areas from './features/areasSlice';
import * as category from './features/categorySlice';

export interface State {
  categories: categories.State;
  featured: featured.State;
  recipe: recipe.State;
  areas: areas.State;
  category: category.State;
}

const enhancers = new Array<StoreEnhancer>();

if (process.env.NODE_ENV !== 'development') {
  enhancers.push(persistState() as StoreEnhancer);
}

export default configureStore<State>({
  reducer: {
    categories: categories.reducer,
    featured: featured.reducer,
    recipe: recipe.reducer,
    areas: areas.reducer,
    category: category.reducer
  },
  enhancers
});
