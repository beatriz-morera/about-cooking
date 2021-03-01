import { db } from "../firebase"
import { User } from '../models/user';

export async function createUserAccount(user: User) {
  console.log("createAccount", user.email)
  const {email} = user
  const userDB = await db.collection('users').doc(email).get()
  if(!userDB.exists){
    await db.collection('users').doc(email).set(user)
  }
}
