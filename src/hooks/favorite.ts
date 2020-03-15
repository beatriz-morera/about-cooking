import { useSelector } from "react-redux";
import { useMemo } from "react";

import { RecipeSummary } from "../models/recipe";
import { selectFavorites } from "../store/selectors";

export function useIsFavorite(meal: Pick<RecipeSummary, "idMeal">) {
  const favorites = useSelector(selectFavorites);
  return useMemo(
    () => meal && favorites.some(fav => fav.idMeal === meal.idMeal),
    [favorites, meal]
  );
}
