import React, { useEffect, useState } from "react";

import firebaseConfig from "../../firebase/firebase.config";
import SideBar from "../../components/SideBar";
import { UsersI } from "../../interface";
import { Table } from "react-bootstrap";
import { BiEditAlt, BiTrash } from "react-icons/bi";

import { Container } from "./styles";

export default function HomePage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    firebaseConfig
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
  return (
    <Container>
      <SideBar />
      <main>
        <div>
          <h1>Usuários</h1>
          <Table striped borderless responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>CPF</th>
                <th>Estado Civil</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UsersI) => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.cpf}</td>
                  <td>{user.maritalStatus}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td className="edit">
                    <BiEditAlt onClick={() => {}} />
                  </td>
                  <td className="remove">
                    <BiTrash onClick={() => {}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </main>
    </Container>
  );
}
