import { createSlice, SliceCaseReducers, Dispatch } from "@reduxjs/toolkit";

import { Recipe } from "../../models/recipe";
import { getRecipeById } from "../../services/recipes";

export interface State {
  recipe?: Recipe;
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: "recipe",
  initialState: {
    recipe: null
  },
  reducers: {
    loaded: (state, action) => {
      state.recipe = action.payload;
    }
  }
});

export const selectRecipe = (state: State) => state.recipe;

export const { loaded } = slice.actions;

export const loadRecipe = (id: string) => (dispatch: Dispatch) =>
  getRecipeById(id).then(res => dispatch(loaded(res)));

export const reducer = slice.reducer;
