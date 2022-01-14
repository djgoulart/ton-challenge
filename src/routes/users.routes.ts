import { Router } from "express";

import listUsersController from "../modules/account/useCases/listUsers";
import createUserController from "../modules/account/useCases/createUser";

const usersRoutes = Router();

usersRoutes.get("/", async (request, response) => {
  return listUsersController().handle(request, response);
});

usersRoutes.post("/", async (request, response) => {
  return createUserController().handle(request, response);
});

export { usersRoutes };
