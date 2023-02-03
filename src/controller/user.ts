import User from '../model/User.js';
import { usersList, setUsersList } from '../data/users.data.js';
import { v4 as uuidv4 } from 'uuid';

export const getAllUsers = (): User[] => {
  const users = usersList.filter((user) => !user.isDeleted);
  return users;
};

export const getUserById = (id: string): User | undefined => {
  const selectedUser = usersList.find((user) => user.id === id);
  return selectedUser;
};

export const createUser = (user: Partial<User>): User => {
  const newUser: User = {
    id: uuidv4(),
    login: user.login!,
    password: user.password!,
    age: user.age!,
    isDeleted: false,
  };

  usersList.push(newUser);

  return newUser;
};

export const updateUser = (updatedUser: User): void => {
  const userId = updatedUser.id;

  const updatedUsers = usersList.map((user) =>
    user.id !== userId
      ? user
      : {
          ...user,
          login: updatedUser.login,
          password: updatedUser.password,
          age: updatedUser.age,
        },
  );

  setUsersList(updatedUsers);
};

export const deleteUser = (id: string): void => {
  const filteredUsers = usersList.map((user) => (user.id !== id ? user : { ...user, isDeleted: true }));
  setUsersList(filteredUsers);
};

export const autoSuggest = (login: string, limit: number = 10): User[] => {
  const autoSuggestedUsers = usersList.filter((user) => user.login.includes(login));

  const autoSuggestedUsersLimited = autoSuggestedUsers.slice(0, limit);
  // Sort users by login
  const sortedUsers = autoSuggestedUsersLimited.sort((a, b) => {
    if (a.login > b.login) {
      return 1;
    }

    if (a.login < b.login) {
      return -1;
    }
    return 0;
  });

  return sortedUsers;
};
