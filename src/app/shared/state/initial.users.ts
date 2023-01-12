import {User} from "../interfaces";

export const initialUsers: User[] = [
  {
    username: 'Bart',
    age: Math.round(Math.random() * 100),
    password: 'Bart' + Date.now(),
    email: 'bart@simpsons.com'
  },
  {
    username: 'Lisa',
    age: Math.round(Math.random() * 100),
    password: 'Lisa' + Date.now(),
    email: 'lisa@simpsons.com'
  },
  {
    username: 'Meggie',
    age: Math.round(Math.random() * 100),
    password: 'Meggie' + Date.now(),
    email: 'meggie@simpsons.com'
  },
  {
    username: 'Homer',
    age: Math.round(Math.random() * 100),
    password: 'Homer' + Date.now(),
    email: 'homer@simpsons.com'
  },
  {
    username: 'Margarette',
    age: Math.round(Math.random() * 100),
    password: 'Margarette' + Date.now(),
    email: 'margarette@simpsons.com'
  },
];
