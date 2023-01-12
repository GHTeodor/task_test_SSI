import {User} from "../../../shared";

export const userNormalizer = (user: User): User => {
  return {
    username: user.username.trim().toUpperCase().charAt(0) + user.username.trim().substring(1,),
    age: user.age,
    email: user.email.trim().toLowerCase(),
    password: user.password,
  };
};
