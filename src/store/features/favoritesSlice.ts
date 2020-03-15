import {
  createSlice,
  SliceCaseReducers,
  PayloadAction
} from "@reduxjs/toolkit";

import { RecipeSummary } from "../../models/recipe";

export interface State {
  list: RecipeSummary[];
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: "favorites",
  initialState: {
    list: []
  },
  reducers: {
    toggleFavorite: (state: State, action: PayloadAction<RecipeSummary>) => {
      const { idMeal } = action.payload;
      const index = state.list.findIndex(recipe => idMeal === recipe.idMeal);
      if (index >= 0) {
        state.list.splice(index, 1);
      } else {
        state.list.push(action.payload);
      }
    }
  }
});

export const selectFavorites = (state: State) => state.list;

export const { toggleFavorite } = slice.actions;

export const reducer = slice.reducer;
