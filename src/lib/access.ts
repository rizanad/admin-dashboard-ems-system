import { getUser } from "@/lib/auth";

export const filterByUser = <T extends { employeeId: string }>(
  data: T[]
) => {
  const user = getUser();

  if (!user) return [];

  if (user.role === "admin") return data;

  return data.filter((item) => item.employeeId === user.id);
};