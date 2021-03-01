import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { searchOutline, optionsOutline } from "ionicons/icons";

import { selectAreas } from "../../store/selectors";
import { loadAreas } from "../../store/features/areasSlice";

import Access from "../../components/Access"
import Categories from "../../components/Categories";
import Featured from "../../components/Featured/Featured";
import Area from "../../components/Area";

import classes from "./Search.module.css";

const Search: React.FC = () => {
  const areas = useSelector(selectAreas);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(loadAreas());
  }, [dispatch]);

  return (
    <Access>
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
          <Categories />
          <h5 className={classes.label}>Featured</h5>
          <Featured />
          {areas.map((area) => (
            <Area area={area} key={area.name} />
          ))}
        </main>
      </IonContent>
    </IonPage>
    </Access>
  );
};

export default Search;
