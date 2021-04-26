import React, { useState } from "react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { BsCheck, BsX } from "react-icons/bs";
import { alterUser, deleteUser } from "../../firebase";
import { UsersI } from "../../interface";
import { CreateUserLine } from "../../pages/HomePage/styles";

const LineTable = ({
  user,
  setUsers,
}: {
  user: UsersI;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [edit, setEdit] = useState(false);
  const [userLine, setUserLine] = useState(user);
  const inputValue = (event: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;
    setUserLine((prev) => {
      const prevUser = { ...prev };
      prevUser[name] = value;
      return prevUser;
    });
  };

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
          <td>
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
            />
          </td>
          <td>
            <input
              name="maritalStatus"
              type="text"
              value={userLine.maritalStatus}
              onChange={inputValue}
            />
          </td>
          <td>
            <input
              name="city"
              type="text"
              value={userLine.city}
              onChange={inputValue}
            />
          </td>
          <td>
            <input
              name="state"
              type="text"
              value={userLine.state}
              onChange={inputValue}
            />
          </td>
        </>
      ) : (
        <>
          <td>{userLine.name}</td>
          <td>{userLine.age}</td>
          <td>{userLine.cpf}</td>
          <td>{userLine.maritalStatus}</td>
          <td>{userLine.city}</td>
          <td>{userLine.state}</td>
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
