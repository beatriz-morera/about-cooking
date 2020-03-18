import { createSlice, SliceCaseReducers, Dispatch } from "@reduxjs/toolkit";

import { getIngredients } from "../../services/recipes";
import { Ingredient } from "../../models/ingredient";

export interface State {
  list: Ingredient[];
}

interface RootState {
  ingredients: State;
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: "ingredients",
  initialState: {
    list: []
  },
  reducers: {
    loaded: (state, action) => {
      state.list = action.payload;
    },
    toggleChecked: (state, action) => {
      const ingredient = state.list.find(
        ing => ing.strIngredient === action.payload
      );
      if (ingredient) {
        ingredient.isChecked = !ingredient.isChecked;
      }
    }
  }
});

export const selectIngredients = (state: State) => state.list;

export const { loaded, toggleChecked } = slice.actions;

export const loadIngredients = () => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const {
    ingredients: { list }
  } = getState();
  if (list.length === 0) {
    const ingredients = await getIngredients();
    dispatch(loaded(ingredients));
  }
};

export const reducer = slice.reducer;
