import type { Role } from "./auth";

export const mockUsers = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    role: "admin" as Role,
  },
  {
    id: "2",
    username: "employee",
    password: "emp123",
    role: "employee" as Role,
  },
];