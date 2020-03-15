import React from "react";

import {
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonHeader
} from "@ionic/react";

import { RecipeSummary } from "../../models/recipe";

import MinimalCard from "../MinimalCard";
import classes from "./List.module.css";

interface ListProps {
  recipes: RecipeSummary[];
  name: string;
}

const ListRecipes: React.FC<ListProps> = ({ name, recipes }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" color="secondary" />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <main className={classes.background}>
          <p className={classes.label}>{recipes?.length} recipes</p>
          {recipes?.map(recipe => (
            <MinimalCard recipe={recipe} key={recipe.idMeal} />
          ))}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ListRecipes;
