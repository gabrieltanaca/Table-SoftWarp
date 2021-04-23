/* eslint-disable import/no-anonymous-default-export */
import { UsersI } from "../interface";
import firebaseConfig from "./firebase.config";

const db = firebaseConfig.firestore().collection("users");

export const saveUser = (user: UsersI) => {
  db.add(user);
};
export const deleteUser = (user: UsersI) => {
  db.doc(user.id).delete();
};

export const alterUser = ({ id, ...user }: UsersI) => {
  db.doc(id).set(user);
};
