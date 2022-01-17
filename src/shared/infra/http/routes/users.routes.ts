import { Router } from "express";

import { ListUsersController } from "@modules/account/useCases/listUsers/ListUsersController";
import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";
import { UpdateUserController } from "@modules/account/useCases/updateUser/UpdateUserController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ShowSignedUserController } from "@modules/account/useCases/showUser/ShowSignedUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const listUsersController = new ListUsersController();
const showSignedUserController = new ShowSignedUserController();

usersRoutes.get("/", listUsersController.handle);
usersRoutes.post("/", createUserController.handle);
usersRoutes.put("/:id", ensureAuthenticated, updateUserController.handle);
usersRoutes.get("/me", ensureAuthenticated, showSignedUserController.handle);

export { usersRoutes };
