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

import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Filter from "./pages/Filter";
import Select from "./pages/Select";
import Results from "./pages/Results";
import ByCategory from "./pages/ByCategory";
import ByArea from "./pages/ByArea";
import Details from "./pages/Details";

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
          <Route path="/auth" component={Auth} exact />
          <Route path="/profile" component={Profile} exact/>
          <Route path="/search" component={Search} exact />
          <Route path="/filter" component={Filter} exact/>
          <Route path="/select" component={Select} exact/>
          <Route path="/results" component={Results} exact/>
          <Route path="/search/:id" component={Details} exact/>
          <Route path="/category/:id" component={ByCategory} exact/>
          <Route path="/area/:id" component={ByArea} exact/>
          <Route path="/" render={() => <Redirect to="/auth" />} exact />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="search" href="/search">
            <IonIcon icon={searchSharp} />
            <IonLabel>Discover</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={heartOutline} />
            <IonLabel>My Recipes</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactHashRouter>
  </IonApp>
);

export default App;
