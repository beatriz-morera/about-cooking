import React from "react";
import { useSelector } from "react-redux";

import {
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonHeader
} from "@ionic/react";

import { selectFavorites } from "../store/selectors";

import ListRecipes from "../components/ListRecipe";
import classes from "./Favorites.module.css";

const Favorites: React.FC = () => {
  const favorites = useSelector(selectFavorites);

  return (
    <>
      {favorites.length ? (
        <ListRecipes recipes={favorites} name={"Favorites"} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/" text="" color="secondary" />
              </IonButtons>
              <IonTitle>Favorites</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <main className={classes.background}>
              <h2 className={classes.empty}>
                Add recipes so you can easily find them later.
              </h2>
            </main>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Favorites;
