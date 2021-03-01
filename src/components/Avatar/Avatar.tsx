import React from "react";
import { CameraResultType, Plugins } from "@capacitor/core";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonIcon
} from "@ionic/react";

import { User } from "../../models/user";

import classes from "./Avatar.module.css";
import { cameraOutline } from "ionicons/icons";

const today = new Date()

const {Camera} = Plugins

export async function takePicture() {


  const image = await Camera.getPhoto({
  quality: 90,
  allowEditing: false,
  resultType: CameraResultType.Uri
  });

  return image.webPath;
  };

interface AvatarProps {
  user: User;
  upadateAvatarHandler: Function;
}

const Avatar: React.FC<AvatarProps> = ({user, upadateAvatarHandler}) => {
  defineCustomElements(window);
const pictureHandler = () => takePicture()

  return (
    <IonItem lines="none">
      <IonAvatar slot="end">
        <img src={user.avatar} alt="avatar" />
      </IonAvatar>
      <IonLabel>
        <h3>
        {user.name}
        </h3>
        <p onClick={pictureHandler}>
          Joined on {today.getFullYear()}
        </p>
      </IonLabel>
      <div className={classes.editIcon}>
      <label htmlFor="validatedCustomFile">
          <IonIcon icon={cameraOutline} />
      </label>
      <input
      type="file"
      id="validatedCustomFile"
      onChange={ev => upadateAvatarHandler(ev)}
      required
      style={{display:'none'}}
      />
      </div>
  </IonItem>
  );
};

export default Avatar;
