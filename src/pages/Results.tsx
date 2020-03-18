import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from "@ionic/react";

import { selectIngredients, selectIngredientRecipes } from "../store/selectors";
import { loadIngredient } from "../store/features/ingredientSlice";

import ListRecipes from "../components/ListRecipes";

import classes from "./Select.module.css";

const Results: React.FC = () => {
  const ingredients = useSelector(selectIngredients);
  const recipes = useSelector(selectIngredientRecipes);
  const selected = ingredients.filter(ing => ing.isChecked);
  const names = selected.map(ing => ing.strIngredient);
  const dispatch = useDispatch();

  useMemo(() => names.map(name => dispatch<any>(loadIngredient(name))), [
    names,
    dispatch
  ]);

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>Results</IonTitle>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/"
              text=""
              color="secondary"
              mode="md"
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <main className={classes.background}>
          <p className={classes.label}>By main ingredient</p>
          {names.map(name => (
            <div key={name}>
              <p>{name}</p>
              <ListRecipes recipes={recipes} showLength={false} />
            </div>
          ))}
        </main>
      </IonContent>
    </IonPage>
  );
};
export default Results;
