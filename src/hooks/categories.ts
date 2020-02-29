import { useState, useEffect, useContext, createContext } from 'react';
import { getCategories } from '../services/recipes';
import Categorie from '../models/categorie';

export const CategoriesContext = createContext<Categorie[]>([]);

export function useCategories() {
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);
  return categories;
}
export const useCategoriesContext = () => useContext(CategoriesContext);
