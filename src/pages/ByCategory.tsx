import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonPage,
  IonTitle
} from "@ionic/react";

import { selectCategoryRecipes } from "../store/selectors";
import { loadCategory } from "../store/features/categorySlice";

import ListRecipes from "../components/ListRecipes";

const ByCategory: React.FC = () => {
  const { id } = useParams();
  const recipes = useSelector(selectCategoryRecipes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadCategory(id));
  }, [dispatch, id]);

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
          <IonTitle>{id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ListRecipes recipes={recipes} />
      </IonContent>
    </IonPage>
  );
};

export default ByCategory;
