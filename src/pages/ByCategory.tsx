import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { selectCategoryRecipes } from "../store/selectors";
import { loadCategory } from "../store/features/categorySlice";

import ListRecipes from "../components/ListRecipe";

const ByCategory: React.FC = () => {
  const { id } = useParams();
  const recipes = useSelector(selectCategoryRecipes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadCategory(id));
  }, [dispatch, id]);

  return <ListRecipes name={id} recipes={recipes} />;
};

export default ByCategory;
