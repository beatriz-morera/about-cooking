import { createSlice, SliceCaseReducers, Dispatch } from '@reduxjs/toolkit';

import Recipe from '../../models/recipe';
import { getRecipeById } from '../../services/recipes';

export interface State {
  recipe?: Recipe;
  isFavorite?: boolean;
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: 'recipe',
  initialState: {
    recipe: null,
    isFavorite: false
  },
  reducers: {
    loaded: (state, action) => {
      state.recipe = action.payload;
    },
    toggleFavorite: state => {
      state.isFavorite = !state.isFavorite;
    }
  }
});

export const selectRecipe = (state: State) => state.recipe;
export const selectFavorite = (state: State) => state.isFavorite;

export const { loaded, toggleFavorite } = slice.actions;

export const loadRecipe = (id: string) => (dispatch: Dispatch) =>
  getRecipeById(id).then(res => dispatch(loaded(res)));

export const reducer = slice.reducer;
