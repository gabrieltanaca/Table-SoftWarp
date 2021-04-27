/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { Table, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { BsCheck, BsX } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

import { Container, CreateUserLine } from "./styles";
import { UsersI } from "../../interface";
import { saveUser } from "../../firebase";
import firebaseConfig from "../../firebase/firebase.config";
import LineTable from "../../components/LineTable";
import api from "../../services/api";
import { sortByName } from "../../functions/sort";

export default function HomePage() {
  const user_default: UsersI = {
    age: "",
    city: "São Paulo",
    cpf: "",
    maritalStatus: "Solteiro",
    name: "",
    state: "SP",
  };
  const [users, setUsers] = useState<any[]>([]);
  const [createUser, setCreateUser] = useState(false);
  const [user, setUser] = useState(user_default as UsersI);
  const [states, setStates] = useState<{ id: string; sigla: string }[]>([]);
  const [cities, setCities] = useState<{ id: string; nome: string }[]>([]);

  const requestStates = async () => {
    const { data } = await api.get("/estados");
    setStates(data);
  };

  const requestCities = async () => {
    const { data } = await api.get(`/estados/${user.state}/municipios`);
    setCities(data);
    setUser((prev) => ({ ...prev, city: data[0].nome }));
  };

  const inputValue = (
    event: React.FormEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = event.currentTarget;
    setUser((prev) => {
      const prevUser = { ...prev };

      prevUser[name] =
        name === "cpf"
          ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
          : value;

      return prevUser;
    });
  };

  useEffect(() => {
    requestStates();

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

  useEffect(() => {
    requestCities();
  }, [user.state]);

  return (
    <Container>
      <div>
        <h1>Usuários</h1>
        <Table striped responsive borderless>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>CPF</th>
              <th>Estado Civil</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.sort(sortByName).map((user: UsersI) => (
              <LineTable
                key={user.id}
                user={user}
                setUsers={setUsers}
                states={states}
              />
            ))}

            {createUser && (
              <CreateUserLine>
                <td className="name">
                  <input
                    name="name"
                    type="text"
                    value={user.name}
                    onChange={inputValue}
                  />
                </td>
                <td className="age">
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
                    maxLength={14}
                  />
                </td>
                <td className="maritalStatus">
                  <Form.Control
                    custom
                    as="select"
                    name="maritalStatus"
                    value={user.maritalStatus}
                    onChange={inputValue}
                  >
                    <option value="Solteiro">Solteiro</option>
                    <option value="Casado">Casado</option>
                    <option value="Divorciado">Divorciado</option>
                    <option value="Viúvo">Viúvo</option>
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    custom
                    as="select"
                    name="state"
                    value={user.state}
                    onChange={inputValue}
                    disabled={!states.length}
                  >
                    {states.map((state) => (
                      <option value={state.sigla} key={state.id}>
                        {state.sigla}
                      </option>
                    ))}
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    custom
                    as="select"
                    name="city"
                    value={user.city}
                    onChange={inputValue}
                    disabled={!cities.length}
                  >
                    {cities.map((city) => (
                      <option value={city.nome} key={city.id}>
                        {city.nome}
                      </option>
                    ))}
                  </Form.Control>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={async () => {
                      console.log(user);
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
