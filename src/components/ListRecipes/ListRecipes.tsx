import React from "react";

import { RecipeSummary } from "../../models/recipe";

import MinimalCard from "../MinimalCard";
import classes from "./List.module.css";

interface ListProps {
  recipes: RecipeSummary[];
}

const ListRecipes: React.FC<ListProps> = ({ recipes }) => {
  return (
    <main className={classes.background}>
      <p className={classes.label}>{recipes?.length} recipes</p>
      {recipes?.map(recipe => (
        <MinimalCard recipe={recipe} key={recipe.idMeal} />
      ))}
    </main>
  );
};

export default ListRecipes;
