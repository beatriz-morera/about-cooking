import * as categories from "./features/categoriesSlice";
import * as featured from "./features/featuredSlice";
import * as recipe from "./features/recipeSlice";
import * as recipes from "./features/recipesSlice";
import * as areas from "./features/areasSlice";
import * as category from "./features/categorySlice";
import * as favorites from "./features/favoritesSlice";
import * as ingredients from "./features/ingredientsSlice";

import { State } from "./store";

export const selectCategories = (state: State) =>
  categories.selectCategories(state.categories);

export const selectFeatured = (state: State) =>
  featured.selectFeatured(state.featured);

export const selectRecipe = (state: State) => recipe.selectRecipe(state.recipe);

export const selectRecipes = (state: State) =>
  recipes.selectRecipes(state.recipes);

export const selectAreas = (state: State) => areas.selectAreas(state.areas);

export const selectCategoryMap = (state: State) =>
  category.selectCategoryMap(state.category);
export const selectCategoryRecipes = (state: State) =>
  category.selectCategoryRecipes(state.category);

export const selectFavorites = (state: State) =>
  favorites.selectFavorites(state.favorites);

export const selectIngredients = (state: State) =>
  ingredients.selectIngredients(state.ingredients);

export const selectSelectedIngredientRecipes = (state: State) =>
  ingredients.selectSelectedIngredientRecipes(state.ingredients);
