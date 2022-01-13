import { Request, Response, Router } from "express";

import { User } from "../../model/User";
import { UsersRepository } from "../../repositories/UsersRepository";

const usersRoutes = Router();
const usersRepository = new UsersRepository();

usersRoutes.get("/", async (request, response) => {
    const all = usersRepository.list();

    return response.json(all);
});

usersRoutes.post("/", async (request, response) => {
    const { name, email, password } = request.body;

    const userEmailAlreadyExists = usersRepository.findByEmail(email);

    if (userEmailAlreadyExists) {
        return response.status(422).json({ message: "The email provided is already in use." })
    }

    usersRepository.create({ name, email, password })

    return response.status(201).send();
});

export { usersRoutes };
