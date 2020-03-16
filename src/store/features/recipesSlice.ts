import {
  createSlice,
  SliceCaseReducers,
  PayloadAction,
  Dispatch
} from "@reduxjs/toolkit";

import { getRecipeByName } from "../../services/recipes";
import { Recipe } from "../../models/recipe";

export interface State {
  list: Recipe[];
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: "recipes",
  initialState: {
    list: []
  },
  reducers: {
    loaded: (state: State, action: PayloadAction<Recipe[]>) => {
      state.list = action.payload;
    }
  }
});

export const selectRecipes = (state: State) => state.list;

export const { loaded } = slice.actions;

export const loadRecipes = (name: string) => (dispatch: Dispatch) =>
  getRecipeByName(name).then(res => dispatch(loaded(res)));

export const reducer = slice.reducer;
