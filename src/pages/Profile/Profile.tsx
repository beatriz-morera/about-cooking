import React, {useCallback} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {
  IonContent,
  IonPage,
} from "@ionic/react";


import {storage, db} from "../../firebase"
import {updateUser} from "../../store/features/authSlice"
import {selectAuth} from "../../store/selectors"

import Avatar from '../../components/Avatar';
import Favorites from "../../components/Favorites"

import classes from './Profile.module.css';

export default () => {
  const user = useSelector(selectAuth)
  const dispatch = useDispatch()


  const upadateAvatarHandler = useCallback(
    async (ev) => {

      const image = ev.target.files[0];
      if(image && (image.type === "image/png" || image.type === "image/jpeg") ){
        const refImage = storage.ref().child(user.email).child('avatar')
        await refImage.put(image)

        const url = await refImage.getDownloadURL()

        await db.collection('users').doc(user.email).update({
            avatar: url
        })

        const updated =  await db.collection('users').doc(user.email).get()

        dispatch(updateUser(updated.data()))
      }
    },
    [dispatch, user.email],
  )

  return (
    <IonPage>
      <IonContent >
        <div className={classes.container}>
          <Avatar user={user} upadateAvatarHandler={(ev: any) => upadateAvatarHandler(ev)}/>
          <div className={classes.recipesContainer}>
            <Favorites/>
          </div>
        </div>
      </IonContent>
    </IonPage>

  )
}
