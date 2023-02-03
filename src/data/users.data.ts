import User from '../model/User.js';

export let usersList: User[] = [
  {
    id: '1',
    login: 'user-1',
    password: 'some-password',
    age: 18,
    isDeleted: false,
  },
  {
    id: '2',
    login: 'user-2',
    password: 'some-password2',
    age: 19,
    isDeleted: false,
  },
  {
    id: '4',
    login: 'user-4',
    password: 'some-password4',
    age: 21,
    isDeleted: false,
  },
  {
    id: '3',
    login: 'user-3',
    password: 'some-password3',
    age: 20,
    isDeleted: false,
  },
];

export const setUsersList = (newUsersList: User[]): void => {
  usersList = newUsersList;
};
