import { UsersI } from "../interface";
import firebaseConfig from "./firebase.config";

const db = firebaseConfig.firestore().collection("users");

export const saveUser = async (user: UsersI) => {
  const { id } = await db.add(user);
  return new Promise((resolve: (arg0: string) => void) => {
    resolve(id);
  });
};
export const deleteUser = (user: UsersI) => db.doc(user.id).delete();

export const alterUser = ({ id, ...user }: UsersI) => {
  db.doc(id).set(user);
};
