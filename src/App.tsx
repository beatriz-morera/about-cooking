import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";
import { IonReactHashRouter } from "@ionic/react-router";
import { heartOutline, searchSharp } from "ionicons/icons";

import Search from "./pages/Search";
import Filter from "./pages/Filter";
import ByCategory from "./pages/ByCategory";
import ByArea from "./pages/ByArea";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactHashRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/search" component={Search} exact />
          <Route path="/filter" component={Filter} />
          <Route path="/search/:id" component={Details} />
          <Route path="/category/:id" component={ByCategory} />
          <Route path="/area/:id" component={ByArea} />

          <Route path="/favorites" component={Favorites} />
          <Route path="/" render={() => <Redirect to="/search" />} exact />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={searchSharp} />
            <IonLabel>Discover</IonLabel>
          </IonTabButton>

          <IonTabButton tab="favorites" href="/favorites">
            <IonIcon icon={heartOutline} />
            <IonLabel>Favorites</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactHashRouter>
  </IonApp>
);

export default App;
