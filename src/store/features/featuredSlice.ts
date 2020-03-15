import { createSlice, SliceCaseReducers, Dispatch } from "@reduxjs/toolkit";

import { Recipe } from "../../models/recipe";
import { getFeatured } from "../../services/recipes";

export interface State {
  recipe: Recipe;
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: "featured",
  initialState: {
    recipe: null
  },
  reducers: {
    loaded: (state, action) => {
      state.recipe = action.payload;
    }
  }
});

export const selectFeatured = (state: State) => state.recipe;

export const { loaded } = slice.actions;

export const loadFeatured = () => (dispatch: Dispatch) =>
  getFeatured().then(res => dispatch(loaded(res)));

export const reducer = slice.reducer;
