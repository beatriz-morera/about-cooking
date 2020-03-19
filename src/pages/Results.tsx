import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonToolbar,
  IonIcon
} from "@ionic/react";
import { searchOutline, optionsOutline, closeSharp } from "ionicons/icons";

import {
  selectSelectedIngredientRecipes,
  selectIngredients
} from "../store/selectors";
import { loadIngredientsRecipes } from "../store/features/ingredientsSlice";

import ListRecipes from "../components/ListRecipes";

import classes from "./Results.module.css";

const Results: React.FC = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectSelectedIngredientRecipes);
  const ingredients = useSelector(selectIngredients);

  const labels = useMemo(
    () =>
      ingredients.filter(ing => ing.isChecked).map(ing => ing.strIngredient),
    [ingredients]
  );

  useEffect(() => {
    dispatch(loadIngredientsRecipes(ingredients.map(ing => ing.strIngredient)));
  }, [dispatch, ingredients]);

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <div className={classes.buttonsContainer}>
            <Link
              to="/filter"
              style={{ textDecoration: "none", display: "flex", flex: 1 }}
            >
              <IonButton
                mode="ios"
                color="medium"
                fill="clear"
                style={{
                  background: "#f5f5f5",
                  borderRadius: "5px",
                  border: "0.5px solid #d1d1d1",
                  padding: "0 20px 0 5px",
                  flex: 1
                }}
              >
                <IonIcon slot="start" icon={searchOutline} />
                Search for recipes
              </IonButton>
            </Link>
            <Link to="/select">
              <IonButton
                mode="ios"
                color="medium"
                fill="clear"
                style={{
                  borderRadius: "5px",
                  border: "0.5px solid #d1d1d1"
                }}
              >
                <IonIcon icon={optionsOutline} color="secondary" />
              </IonButton>
            </Link>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <main className={classes.background}>
          <section className={classes.container}>
            <div className={classes.content}>
              {labels?.map(l => (
                <IonButton mode="md" color="secondary" key={l}>
                  <IonIcon icon={closeSharp} slot="end" />
                  {l}
                </IonButton>
              ))}
            </div>
          </section>

          {recipes && <ListRecipes recipes={recipes} />}
        </main>
      </IonContent>
    </IonPage>
  );
};
export default Results;
