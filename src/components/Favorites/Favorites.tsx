import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  IonButton,
  IonIcon,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";

import { selectFavorites } from "../../store/selectors";
import ListRecipes from "../ListRecipes";

import LoadImage from "../LazyLoadImage";
import logo from "../../assets/icon.png";

import classes from "./Favorites.module.css";

const Favorites: React.FC = () => {
  const favorites = useSelector(selectFavorites);

  return (
      <section>
        {favorites.length ? (
          <ListRecipes recipes={favorites} />
        ) : (
          <div className={classes.notFound}>
            <div className={classes.image}>
              <LoadImage src={logo} alt={"chef hat"} />
            </div>

            <h4 className={classes.bolder}>NO RECIPES YET</h4>
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
      </section>
  );
};

export default Favorites;
