import { configureStore } from "@reduxjs/toolkit";

import * as auth from "./features/authSlice";
import * as categories from "./features/categoriesSlice";
import * as featured from "./features/featuredSlice";
import * as recipe from "./features/recipeSlice";
import * as recipes from "./features/recipesSlice";
import * as areas from "./features/areasSlice";
import * as category from "./features/categorySlice";
import * as favorites from "./features/favoritesSlice";
import * as ingredients from "./features/ingredientsSlice";

export interface State {
  auth: auth.State;
  categories: categories.State;
  featured: featured.State;
  recipe: recipe.State;
  recipes: recipes.State;
  areas: areas.State;
  category: category.State;
  favorites: favorites.State;
  ingredients: ingredients.State;
}

export default configureStore<State>({
  reducer: {
    auth: auth.reducer,
    categories: categories.reducer,
    featured: featured.reducer,
    recipe: recipe.reducer,
    recipes: recipes.reducer,
    areas: areas.reducer,
    category: category.reducer,
    favorites: favorites.reducer,
    ingredients: ingredients.reducer
  }
});
