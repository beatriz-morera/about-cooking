import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonButtons,
  IonBackButton,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonFooter,
  IonButton
} from "@ionic/react";
import { close } from "ionicons/icons";

import { selectIngredients } from "../store/selectors";
import {
  loadIngredients,
  toggleChecked
} from "../store/features/ingredientsSlice";

import classes from "./Select.module.css";
import { Link } from "react-router-dom";

const Select: React.FC = () => {
  const ingredients = useSelector(selectIngredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadIngredients());
  }, [dispatch]);

  const checkedHandler = useCallback(
    ev => dispatch(toggleChecked(ev.detail.value)),
    [dispatch]
  );

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>Filters</IonTitle>
          <IonButtons slot="end">
            <IonBackButton
              defaultHref="/"
              text=""
              color="secondary"
              mode="md"
              icon={close}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <main className={classes.background}>
          <p className={classes.label}>By main ingredient</p>
          <IonList lines="full" mode="ios">
            {ingredients.map(({ strIngredient, isChecked }) => (
              <IonItem key={strIngredient}>
                <IonLabel>{strIngredient}</IonLabel>
                <IonCheckbox
                  slot="end"
                  value={strIngredient}
                  mode="md"
                  color="secondary"
                  checked={isChecked}
                  onIonChange={checkedHandler}
                />
              </IonItem>
            ))}
          </IonList>
        </main>
      </IonContent>
      <IonFooter mode="ios">
        <IonToolbar>
          <Link to="/results" style={{ textDecoration: "none" }}>
            <IonButton
              color="secondary"
              expand="full"
              shape="round"
              disabled={!ingredients.some(ing => ing.isChecked)}
            >
              Apply
            </IonButton>
          </Link>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
export default Select;