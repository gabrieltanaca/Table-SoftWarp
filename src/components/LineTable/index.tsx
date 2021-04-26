import React, { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { BsCheck, BsX } from "react-icons/bs";

import { alterUser, deleteUser } from "../../firebase";
import { UsersI } from "../../interface";
import { CreateUserLine } from "../../pages/HomePage/styles";
import api from "../../services/api";

interface LineTableProps {
  user: UsersI;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
  states: { id: string; sigla: string }[];
}

const LineTable = ({ user, setUsers, states }: LineTableProps) => {
  const [edit, setEdit] = useState(false);
  const [userLine, setUserLine] = useState(user);
  const [cities, setCities] = useState<{ id: string; nome: string }[]>([]);

  const requestCities = async () => {
    const { data } = await api.get(`/estados/${user.state}/municipios`);
    setCities(data);
  };

  const inputValue = (
    event: React.FormEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = event.currentTarget;
    setUserLine((prev) => {
      const prevUser = { ...prev };

      prevUser[name] =
        name === "cpf"
          ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
          : value;

      return prevUser;
    });
  };

  useEffect(() => {
    requestCities();
  }, [userLine.state]);

  return (
    <CreateUserLine>
      {edit ? (
        <>
          <td className="name">
            <input
              name="name"
              type="text"
              value={userLine.name}
              onChange={inputValue}
            />
          </td>
          <td className="age">
            <input
              name="age"
              type="text"
              value={userLine.age}
              onChange={inputValue}
            />
          </td>
          <td>
            <input
              name="cpf"
              type="text"
              value={userLine.cpf}
              onChange={inputValue}
              maxLength={14}
            />
          </td>
          <td className="maritalStatus">
            <Form.Control
              custom
              as="select"
              name="maritalStatus"
              value={userLine.maritalStatus}
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
              value={userLine.state}
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
              value={userLine.city}
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
        </>
      ) : (
        <>
          <td>{userLine.name}</td>
          <td>{userLine.age}</td>
          <td>{userLine.cpf}</td>
          <td>{userLine.maritalStatus}</td>
          <td>{userLine.state}</td>
          <td>{userLine.city}</td>
        </>
      )}
      <td className="edit">
        {edit ? (
          <BsCheck
            onClick={() => {
              alterUser(userLine);
              setEdit(false);
            }}
          />
        ) : (
          <BiEditAlt
            onClick={() => {
              setEdit(true);
            }}
          />
        )}
      </td>
      <td className="remove">
        {edit ? (
          <BsX
            onClick={() => {
              setEdit(false);
            }}
          />
        ) : (
          <BiTrash
            onClick={() => {
              deleteUser(userLine);
              setUsers((prev) =>
                prev.filter((userPrev) => userPrev.id !== userLine.id)
              );
            }}
          />
        )}
      </td>
    </CreateUserLine>
  );
};

export default LineTable;
