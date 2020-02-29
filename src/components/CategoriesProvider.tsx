import React from 'react';
import { useCategories, CategoriesContext } from '../hooks/categories';

const CategoriesProvider = ({ children }) => {
  const categories = useCategories();
  return <CategoriesContext.Provider value={categories}>{children}</CategoriesContext.Provider>;
};

export default CategoriesProvider;
