export interface RecipeSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface List {
  name: string;
  recipes: RecipeSummary[];
}

export interface Ingredient {
  name: string;
  measure: string;
}

export default interface Recipe extends RecipeSummary {
  strCategory: string;
  strArea: string;
  strTags: string;
  strYoutube: string;
  strInstructions: string;
  ingredients: Ingredient[];
}
