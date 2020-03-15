import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { IonCard, IonIcon } from "@ionic/react";
import { heartOutline, heartSharp } from "ionicons/icons";

import { toggleFavorite } from "../../store/features/favoritesSlice";
import { useIsFavorite } from "../../hooks/favorite";
import { RecipeSummary, Recipe } from "../../models/recipe";

import classes from "./MinimalCard.module.css";

interface MinimalCardProps {
  recipe: RecipeSummary & Partial<Recipe>;
}

const MinimalCard: React.FC<MinimalCardProps> = ({ recipe }) => {
  const activeFavorite = useIsFavorite(recipe);
  const dispatch = useDispatch();

  const favoriteHandler = useCallback(() => {
    dispatch<any>(toggleFavorite(recipe));
  }, [dispatch, recipe]);

  return (
    <IonCard mode="ios" key={recipe.idMeal}>
      <div className={classes.imageContainer}>
        <Link
          to={`/search/${recipe.idMeal}`}
          style={{ textDecoration: "none" }}
        >
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className={classes.image}
          />
        </Link>
      </div>
      <div className={classes.info}>
        <Link
          to={`/search/${recipe.idMeal}`}
          style={{ textDecoration: "none" }}
        >
          <h6 className={classes.name}>{recipe.strMeal}</h6>
        </Link>
        <IonIcon
          icon={activeFavorite ? heartSharp : heartOutline}
          color="secondary"
          style={{ fontSize: "25px" }}
          onClick={() => favoriteHandler()}
        />
      </div>
    </IonCard>
  );
};
export default MinimalCard;
