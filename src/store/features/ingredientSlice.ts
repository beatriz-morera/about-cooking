import {
  createSlice,
  createSelector,
  SliceCaseReducers,
  Dispatch
} from "@reduxjs/toolkit";

import { getRecipesByIngredient } from "../../services/recipes";
import { RecipeSummary } from "../../models/recipe";

export interface State {
  list: {
    [name: string]: RecipeSummary[];
  };
  activeIngredient?: string;
}

interface RootState {
  ingredient: State;
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: "ingredient",
  initialState: {
    list: {}
  },
  reducers: {
    ingredientLoaded: (state, action) => {
      const { ingredient, recipes } = action.payload;
      state.list[ingredient] = recipes;
    },
    setActiveIngredient: (state, action) => {
      state.activeIngredient = action.payload;
    }
  }
});

export const selectIngredientMap = (state: State) => state.list;
export const selectActiveIngredient = (state: State) => state.activeIngredient;
export const selectIngredientRecipes = createSelector(
  selectActiveIngredient,
  selectIngredientMap,
  (name, list) => {
    if (!name) {
      return [];
    }
    return list[name];
  }
);

export const { ingredientLoaded, setActiveIngredient } = slice.actions;

export const loadIngredient = (ing: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const {
    ingredient: { list }
  } = getState();

  if (!list[ing]) {
    const recipes = await getRecipesByIngredient(ing);
    dispatch(ingredientLoaded({ ingredient: ing, recipes }));
  }

  dispatch(setActiveIngredient(ing));
};

export const reducer = slice.reducer;
