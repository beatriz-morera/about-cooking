import Categorie from '../models/categorie';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

//recipes by name

export async function findRecipe(name: string): Promise<[]> {
  const url = `${BASE_URL}/search.php?s=${name}`;
  const rs = await fetch(url);
  const { meals } = await rs.json();
  if (!meals.length) {
    throw new Error('No Found!');
  }
  return meals;
}

//all categories
export async function getCategories(): Promise<Categorie[]> {
  const url = `${BASE_URL}/categories.php`;
  const rs = await fetch(url);
  const { categories } = await rs.json();
  return categories;
}

//recipes by category
