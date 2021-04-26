import { UsersI } from "../interface";

export const sortByName = (a: UsersI, b: UsersI) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
};
