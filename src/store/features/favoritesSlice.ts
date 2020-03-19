import {
  createSlice,
  SliceCaseReducers,
  PayloadAction
} from "@reduxjs/toolkit";

import { RecipeSummary } from "../../models/recipe";

export interface State {
  list: RecipeSummary[];
}

const STORAGE_KEY = "favorites";

function loadInitialState(): State {
  const json = localStorage.getItem(STORAGE_KEY);
  if (json) {
    return JSON.parse(json);
  }
  return {
    list: []
  };
}

function persistState(state: State) {
  const json = JSON.stringify(state);
  localStorage.setItem(STORAGE_KEY, json);
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: "favorites",
  initialState: loadInitialState(),
  reducers: {
    toggleFavorite: (state: State, action: PayloadAction<RecipeSummary>) => {
      const { idMeal } = action.payload;
      const index = state.list.findIndex(recipe => idMeal === recipe.idMeal);
      if (index >= 0) {
        state.list.splice(index, 1);
      } else {
        state.list.push(action.payload);
      }
      persistState(state);
    }
  }
});

export const selectFavorites = (state: State) => state.list;

export const { toggleFavorite } = slice.actions;

export const reducer = slice.reducer;
