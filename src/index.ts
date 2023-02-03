import express, { NextFunction, Request, Response } from 'express';
import {
  // Use this as a replacement for express.Request
  ValidatedRequest,
  ContainerTypes,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';
import {
  autoSuggest,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from './controller/user.js';
import { addSchema, updateSchema } from './schema/user.js';
import User from './model/User.js';

const serverPort = 8000;
const app = express();
const validator = createValidator();
app.use(express.json());

interface CraeteUserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Fields]: {
    login: string;
    password: string;
    age: number;
  };
}

const routeHandler = <T>(fn: (req: T, res: Response) => void) => {
  return (req: T, res: Response, next: NextFunction) => {
    try {
      fn(req, res);
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
      next(message);
    }
  };
};

app.get(
  '/api/users',
  routeHandler<Request>((req, res) => {
    const usersList = getAllUsers();
    res.json(usersList);
  }),
);

app.get(
  '/api/users/:id',
  routeHandler<Request>((req, res) => {
    const userId = req.params.id;
    const user = getUserById(userId);
    if (user !== undefined) {
      res.json(user);
    } else {
      res.status(404).send('Not found');
    }
  }),
);

app.post(
  '/api/users',
  validator.body(addSchema),
  routeHandler<ValidatedRequest<CraeteUserRequestSchema>>((req, res) => {
    const user: Partial<User> = req.body;
    const newUser = createUser(user);
    res.status(201).json(newUser);
  }),
);

app.put(
  '/api/users',
  validator.body(updateSchema),
  routeHandler<ValidatedRequest<CraeteUserRequestSchema>>((req, res) => {
    const updatedUser: User = req.body;
    updateUser(updatedUser);
    res.status(200).json({ message: 'User successfully updated' });
  }),
);

app.delete(
  '/api/users/:id',
  routeHandler<Request>((req, res) => {
    const userId = req.params.id;
    deleteUser(userId);
    res.status(204).json({ message: 'User deleted successfully' });
  }),
);

// Auto suggest users
app.get(
  '/api/users-auto-suggest',
  routeHandler<Request>((req, res) => {
    const loginSearch = req.query.login as string;
    const loginLimit = req.query.limit as string;
    const usersList = autoSuggest(loginSearch, parseInt(loginLimit, 10));
    res.status(200).json(usersList);
  }),
);

app.listen(serverPort, () => {
  console.log(`Listening from on port ${serverPort}`);
});
