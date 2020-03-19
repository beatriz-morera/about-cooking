import {
  createSlice,
  SliceCaseReducers,
  Dispatch,
  createSelector
} from "@reduxjs/toolkit";

import { getIngredients, getRecipesByIngredient } from "../../services/recipes";
import { Ingredient } from "../../models/ingredient";
import { RecipeSummary } from "../../models/recipe";

export interface State {
  list: Ingredient[];
  recipes: {
    [name: string]: RecipeSummary[];
  };
}

interface RootState {
  ingredients: State;
}

export const slice = createSlice<State, SliceCaseReducers<State>>({
  name: "ingredients",
  initialState: {
    list: [],
    recipes: {}
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
    },
    ingredientLoaded: (state, action) => {
      const { ingredient, recipes } = action.payload;
      state.recipes[ingredient] = recipes;
    }
  }
});

export const selectIngredients = (state: State) => state.list;
export const selectIngredientRecipes = (state: State) => state.recipes;
export const selectSelectedIngredientRecipes = createSelector(
  selectIngredients,
  selectIngredientRecipes,
  (ingredients, recipes) => {
    const list = [];
    ingredients
      .filter(ing => ing.isChecked)
      .flatMap(ing => recipes[ing.strIngredient])
      .forEach(recipe => {
        if (!list.find(r => r.idMeal === recipe.idMeal)) {
          list.push(recipe);
        }
      });
    return list;
  }
);

export const { loaded, toggleChecked, ingredientLoaded } = slice.actions;

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

export const loadIngredientsRecipes = (ingredients: string[]) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const {
    ingredients: { recipes }
  } = getState();

  const tasks = ingredients
    .filter(ing => !recipes[ing])
    .map(async ingredient => ({
      ingredient,
      recipes: await getRecipesByIngredient(ingredient)
    }));

  const results = await Promise.all(tasks);
  results.forEach(res => dispatch(ingredientLoaded(res)));
};

export const reducer = slice.reducer;
