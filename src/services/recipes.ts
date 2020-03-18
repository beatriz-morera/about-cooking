import Category from "../models/category";
import { List, RecipeSummary, Recipe } from "../models/recipe";
import { Area } from "../models/area";
import { Ingredient } from "../models/ingredient";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

function* range(from: number, count: number) {
  for (let i = from; i < from + count; i++) {
    yield i;
  }
}

//recipes by name

export async function getRecipeByName(name: string): Promise<[]> {
  const url = `${BASE_URL}/search.php?s=${name}`;
  const rs = await fetch(url);
  const { meals } = await rs.json();

  return meals;
}

//recipes by id

export async function getRecipeById(id: string): Promise<Recipe> {
  const url = `${BASE_URL}/lookup.php?i=${id}`;
  const rs = await fetch(url);
  const { meals } = await rs.json();

  const [meal] = meals.map(m => {
    const ingredients = [...range(1, 20)]
      .map(i => ({
        name: m[`strIngredient${i}`],
        measure: m[`strMeasure${i}`]
      }))
      .filter(x => x.name)
      .reduce((map, ing) => map.set(ing.name + ing.measure, ing), new Map())
      .values();
    return {
      ...m,
      ingredients: [...ingredients]
    };
  });

  return meal;
}

//featured recipe
export async function getFeatured(): Promise<Recipe[]> {
  const url = `${BASE_URL}/random.php`;
  const rs = await fetch(url);
  const {
    meals: [meal]
  } = await rs.json();
  return meal;
}

//All categories
export async function getCategories(): Promise<Category[]> {
  const url = `${BASE_URL}/categories.php`;
  const rs = await fetch(url);
  const { categories } = await rs.json();
  return categories;
}
// Recipes by category

export async function getRecipesByCategory(
  category: string
): Promise<RecipeSummary[]> {
  const url = `${BASE_URL}/filter.php?c=${category}`;
  const rs = await fetch(url);
  const { meals } = await rs.json();
  return meals;
}

//All areas
export async function getAreas(): Promise<Area[]> {
  const url = `${BASE_URL}/list.php?a=list`;
  const rs = await fetch(url);
  const { meals } = await rs.json();
  return meals;
}

//Recipes by area
export async function getRecipesByArea(area: string): Promise<RecipeSummary[]> {
  const url = `${BASE_URL}/filter.php?a=${area}`;
  const rs = await fetch(url);
  const { meals } = await rs.json();
  return meals;
}

export async function getRecipesByAreas(): Promise<List[]> {
  const areas = await getAreas();

  const recipesFetch = areas.map(async area => ({
    name: area.strArea,
    recipes: await getRecipesByArea(area.strArea)
  }));

  const recipes = await Promise.all(recipesFetch);

  return recipes.filter(r => r.recipes.length >= 5);
}

//Ingredients
export async function getIngredients(): Promise<Ingredient[]> {
  const url = `${BASE_URL}/list.php?i=list`;
  const rs = await fetch(url);
  const { meals } = await rs.json();

  return meals.slice(0, 50).map(({ strIngredient }) => {
    return { strIngredient, isChecked: false };
  });
}

//Recipes by main Ingredient
export async function getRecipesByIngredient(
  ingredient: string
): Promise<RecipeSummary[]> {
  const url = `${BASE_URL}/filter.php?i=${ingredient}`;
  const rs = await fetch(url);
  const { meals } = await rs.json();
  return meals;
}
