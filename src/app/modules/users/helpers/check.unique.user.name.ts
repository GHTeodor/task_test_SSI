import {User} from "../../../shared";

export const checkUniqueUserName = (username: string, users: User[]): boolean => {
  return users.some(user => user.username === username);
}
