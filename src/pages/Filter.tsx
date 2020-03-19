import React, { useCallback, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonBackButton,
  IonButtons,
  IonToolbar,
  IonInput
} from "@ionic/react";

import classes from "./Filter.module.css";
import logo from "../assets/icon.png";

import { selectRecipes } from "../store/selectors";
import { loadRecipes } from "../store/features/recipesSlice";
import ListRecipes from "../components/ListRecipes";

const Filter: React.FC = () => {
  const [value, setValue] = useState("");
  const searchTimeout = useRef<any>();
  const recipes = useSelector(selectRecipes);
  const dispatch = useDispatch();

  const findRecipeHandler = useCallback(
    ev => {
      const text = ev.target.value;
      const name = text.trim();
      if (name.length > 0) {
        setValue(name);
        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(
          () => dispatch<any>(loadRecipes(name)),
          300
        );
      } else {
        setValue("");
      }
    },
    [dispatch]
  );

  const textRef = useRef<HTMLIonInputElement>();

  useEffect(() => {
    // (textRef.current ? textRef.current.setFocus() : textRef.current)
    const interval = setInterval(
      () => textRef.current?.setFocus().then(() => clearInterval(interval)),
      100
    );
    return () => clearInterval(interval);
  }, []);

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
          <IonInput
            ref={textRef}
            autofocus
            clearInput
            value={value}
            placeholder="Search for recipes"
            onIonChange={findRecipeHandler}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {value ? (
          <section>
            {recipes ? (
              <ListRecipes recipes={recipes} />
            ) : (
              <div className={classes.notFound}>
                <img src={logo} alt="chef hat" />
                <h3 className={classes.bolder}>
                  Didn't find anything for {`"${value}"`}
                </h3>
                <p>Try searching for another recipe</p>
              </div>
            )}
          </section>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Filter;
