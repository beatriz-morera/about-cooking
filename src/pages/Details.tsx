import React, { useEffect, useCallback } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  IonPage,
  IonContent,
  IonCard,
  IonCardSubtitle,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton
} from "@ionic/react";
import { heartOutline, heartSharp } from "ionicons/icons";

import { selectRecipe } from "../store/selectors";
import { loadRecipe } from "../store/features/recipeSlice";
import { toggleFavorite } from "../store/features/favoritesSlice";
import { useIsFavorite } from "../hooks/favorite";
import tagsHandler from "../services/stringsFixer";

import classes from "./Details.module.css";

const Details: React.FC = () => {
  const recipe = useSelector(selectRecipe);
  const { id } = useParams();
  const activeFavorite = useIsFavorite(recipe);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(loadRecipe(id));
  }, [dispatch, id]);

  const favoriteHandler = useCallback(() => {
    dispatch<any>(toggleFavorite(recipe));
  }, [dispatch, recipe]);

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/"
              text=""
              color="secondary"
              mode="md"
            />
          </IonButtons>
          <IonIcon
            icon={activeFavorite ? heartSharp : heartOutline}
            color="secondary"
            style={{ fontSize: "25px", marginRight: "15px" }}
            slot="end"
            onClick={() => favoriteHandler()}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <main className={classes.background}>
          {recipe ? (
            <section key={recipe.idMeal}>
              {recipe.strYoutube ? (
                <div className={classes.playerWrapper}>
                  <ReactPlayer
                    className={classes.reactPlayer}
                    url={recipe.strYoutube}
                    playing
                    controls
                    volume={0.3}
                    muted
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              )}
              <div className={classes.info}>
                <h1 className={classes.name}>{recipe.strMeal}</h1>
                <IonCardSubtitle
                  mode="ios"
                  color="secondary"
                  style={{ fontSize: "14px", marginTop: "5px" }}
                >
                  {recipe.strCategory} * {recipe.strArea}{" "}
                  {tagsHandler(recipe.strTags)}
                </IonCardSubtitle>
              </div>
              <h5 className={classes.label}>Ingredients</h5>
              <IonCard mode="ios">
                {recipe.ingredients.map(ingredient => (
                  <div
                    key={ingredient.name + ingredient.measure}
                    className={classes.ingredients}
                  >
                    <p>{ingredient.name}</p>
                    <p className={classes.measures}>{ingredient.measure}</p>
                  </div>
                ))}
              </IonCard>
              <h5 className={classes.label}>Preparation</h5>
              <IonCard mode="ios">
                <div className={classes.preparation}>
                  {recipe.strInstructions}
                </div>
              </IonCard>
              {recipe.strYoutube && (
                <IonCard mode="ios">
                  <img
                    className={classes.image}
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                  />
                </IonCard>
              )}
              <h5 className={classes.label}>Related Recipes</h5>
            </section>
          ) : null}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Details;
