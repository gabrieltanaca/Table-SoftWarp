import React, { useState } from "react";
import { useEffect } from "react";
import firebase from "./config/firebase";

interface UsersI {
  age: string;
  city: string;
  cpf: string;
  id: string;
  maritalStatus: string;
  name: string;
  state: string;
}

function App() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((usersData) => {
        let arrayUsers: any[] = [];

        usersData.docs.forEach((user) => {
          arrayUsers.push({ id: user.id, ...user.data() });
        });
        setUsers(arrayUsers);
      });
  }, []);

  return <div className="App"></div>;
}

export default App;
