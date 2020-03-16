import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { selectAreas } from "../store/selectors";
import { loadArea } from "../store/features/areasSlice";

import ListRecipes from "../components/ListRecipes";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonPage,
  IonTitle
} from "@ionic/react";

const ByAreas: React.FC = () => {
  const { id } = useParams();
  const areas = useSelector(selectAreas);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadArea(id));
  }, [dispatch, id]);

  const area = areas.find(area => area.name === id);

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
      <IonContent>{area && <ListRecipes recipes={area.recipes} />}</IonContent>
    </IonPage>
  );
};

export default ByAreas;
