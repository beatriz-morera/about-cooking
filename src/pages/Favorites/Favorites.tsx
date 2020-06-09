import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonHeader,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";

import { selectFavorites } from "../../store/selectors";
import ListRecipes from "../../components/ListRecipes";

import LoadImage from "../../components/LazyLoadImage";
import logo from "../../assets/icon.png";

import classes from "./Favorites.module.css";

const Favorites: React.FC = () => {
  const favorites = useSelector(selectFavorites);

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
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {favorites.length ? (
          <ListRecipes recipes={favorites} />
        ) : (
          <div className={classes.notFound}>
            <div className={classes.image}>
              <LoadImage src={logo} alt={"chef hat"} />
            </div>

            <h3 className={classes.bolder}>NO RECIPES YET</h3>
            <p>What would you like to cook?</p>
            <Link to="/search">
              <IonButton
                shape="round"
                color="secondary"
                fill="outline"
                mode="ios"
              >
                <IonIcon icon={searchOutline} slot="start" />
                Search for recipes
              </IonButton>
            </Link>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
