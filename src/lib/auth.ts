import { mockUsers } from "./mockUsers";

export type Role = "admin" | "employee";

export interface User {
    id:string;
  username: string;
  role: Role;
}

const STORAGE_KEY = "ems_user";

export const getUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const login = (user: User) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const loginWithCredentials = (
  username: string,
  password: string
): User | null => {
  const foundUser = mockUsers.find(
    (u) => u.username === username && u.password === password
  );

  if (!foundUser) return null;

  const user: User = {
    id: foundUser.id,
    username: foundUser.username,
    role: foundUser.role,
  };

  login(user);

  return user;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};