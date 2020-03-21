import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { IonCard, IonCardSubtitle, IonIcon } from "@ionic/react";
import { heartOutline, heartSharp } from "ionicons/icons";

import { toggleFavorite } from "../../store/features/favoritesSlice";
import tagsHandler from "../../services/stringsFixer";
import { useIsFavorite } from "../../hooks/favorite";
import { RecipeSummary, Recipe } from "../../models/recipe";
import LoadImage from "../LazyLoadImage";

import classes from "./Card.module.css";

interface CardProps {
  recipe: RecipeSummary & Partial<Recipe>;
}

const Card: React.FC<CardProps> = ({ recipe }) => {
  const activeFavorite = useIsFavorite(recipe);

  const dispatch = useDispatch();

  const favoriteHandler = useCallback(() => {
    dispatch<any>(toggleFavorite(recipe));
  }, [dispatch, recipe]);

  return (
    <IonCard mode="ios">
      <Link to={`/search/${recipe.idMeal}`}>
        <div className={classes.image}>
          <LoadImage src={recipe.strMealThumb} alt={recipe.strMeal} />
        </div>
      </Link>
      <div className={classes.info}>
        <Link
          to={`/search/${recipe.idMeal}`}
          style={{ textDecoration: "none" }}
        >
          <h4 className={classes.name}>{recipe.strMeal}</h4>
        </Link>

        <div className={classes.iconsTagsContainer}>
          <IonCardSubtitle
            mode="ios"
            color="secondary"
            style={{ fontSize: "12px", marginTop: "5px" }}
          >
            {recipe.strCategory} * {recipe.strArea}{" "}
            {tagsHandler(recipe.strTags)}
          </IonCardSubtitle>

          <IonIcon
            icon={activeFavorite ? heartSharp : heartOutline}
            color="secondary"
            style={{ fontSize: "25px" }}
            onClick={() => favoriteHandler()}
          />
        </div>
      </div>
    </IonCard>
  );
};
export default Card;
