export interface User {
  username: string;
  email: string;
  password: string
  age: number;
}

export interface UserForUpdate extends User {
  confirmPassword: string;
}
