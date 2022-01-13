import { Request, Response, Router } from "express";

import { UsersRepository } from "./../repositories/UsersRepository";
import { CreateUserService } from "./../services/CreateUserService";

const usersRoutes = Router();
const usersRepository = new UsersRepository();

usersRoutes.get("/", async (request: Request, response: Response) => {
    const all = usersRepository.list();

    return response.json(all);
});

usersRoutes.post("/", async (request: Request, response: Response) => {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService(usersRepository);

    createUserService.execute({ name, email, password });

    return response.status(201).send();
});

export { usersRoutes };
