import React, { useEffect, useState } from "react";

import { Table, Button } from "react-bootstrap";
import { BsCheck, BsX } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

import { Container, CreateUserLine } from "./styles";
import { UsersI } from "../../interface";
import { saveUser } from "../../firebase";
import firebaseConfig from "../../firebase/firebase.config";
import LineTable from "../../components/LineTable";

export default function HomePage() {
  const user_default: UsersI = {
    age: "",
    city: "",
    cpf: "",
    maritalStatus: "",
    name: "",
    state: "",
  };
  const [users, setUsers] = useState<any[]>([]);
  const [createUser, setCreateUser] = useState(false);
  const [user, setUser] = useState(user_default as UsersI);
  const inputValue = (event: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;
    setUser((prev) => {
      const prevUser = { ...prev };
      prevUser[name] = value;
      return prevUser;
    });
  };

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
              <LineTable key={user.id} user={user} setUsers={setUsers} />
            ))}
            {createUser && (
              <CreateUserLine>
                <td>
                  <input
                    name="name"
                    type="text"
                    value={user.name}
                    onChange={inputValue}
                  />
                </td>
                <td>
                  <input
                    name="age"
                    type="text"
                    value={user.age}
                    onChange={inputValue}
                  />
                </td>
                <td>
                  <input
                    name="cpf"
                    type="text"
                    value={user.cpf}
                    onChange={inputValue}
                  />
                </td>
                <td>
                  <input
                    name="maritalStatus"
                    type="text"
                    value={user.maritalStatus}
                    onChange={inputValue}
                  />
                </td>
                <td>
                  <input
                    name="city"
                    type="text"
                    value={user.city}
                    onChange={inputValue}
                  />
                </td>
                <td>
                  <input
                    name="state"
                    type="text"
                    value={user.state}
                    onChange={inputValue}
                  />
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={async () => {
                      const id = await saveUser(user);
                      if (id) setUsers((prev) => [...prev, { id, ...user }]);
                      setCreateUser(false);
                      setUser(user_default);
                    }}
                  >
                    <BsCheck />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => setCreateUser(false)}
                  >
                    <BsX />
                  </Button>
                </td>
              </CreateUserLine>
            )}
            <tr className="addUser">
              <td colSpan={8} className="notPadding">
                <Button
                  variant="primary"
                  onClick={() => setCreateUser(true)}
                  disabled={createUser}
                >
                  Adicionar usuário
                  <AiOutlinePlus size="30" />
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
