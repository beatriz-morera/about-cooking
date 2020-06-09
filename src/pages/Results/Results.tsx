import React, { useEffect, useMemo, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { searchOutline, optionsOutline, closeSharp } from "ionicons/icons";

import {
  selectSelectedIngredientRecipes,
  selectSelectedIngredients,
} from "../../store/selectors";
import {
  loadIngredientsRecipes,
  toggleChecked,
} from "../../store/features/ingredientsSlice";

import ListRecipes from "../../components/ListRecipes";

import classes from "./Results.module.css";

const Results: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const recipes = useSelector(selectSelectedIngredientRecipes, shallowEqual);
  const ingredients = useSelector(selectSelectedIngredients, shallowEqual);

  const labels = useMemo(() => ingredients.map((ing) => ing.strIngredient), [
    ingredients,
  ]);

  useEffect(() => {
    if (labels.length === 0) {
      history.push("/search");
    } else {
      dispatch(loadIngredientsRecipes(labels));
    }
  }, [dispatch, history, labels]);

  const checkedHandler = useCallback(
    (label) => dispatch(toggleChecked(label)),
    [dispatch]
  );

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
                  flex: 1,
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
                  border: "0.5px solid #d1d1d1",
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
              {labels?.map((label) => (
                <IonButton
                  key={label}
                  mode="md"
                  color="secondary"
                  onClick={() => checkedHandler(label)}
                >
                  <IonIcon icon={closeSharp} slot="end" />
                  {label}
                </IonButton>
              ))}
            </div>
          </section>
          {recipes.length > 0 && <ListRecipes recipes={recipes} />}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Results;
