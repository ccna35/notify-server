import { User } from "../types";

export interface UserDAO {
  createUser(user: User): void;
  getUser(id: string): User | undefined;
  deleteUser(id: string): void;
}
