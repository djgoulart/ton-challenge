import { Router } from "express";

import { ListUsersController } from "../modules/account/useCases/listUsers/ListUsersController";
import { CreateUserController } from "../modules/account/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();

usersRoutes.get("/", listUsersController.handle);
usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
