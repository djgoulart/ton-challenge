import { Request, Response } from "express";
import { ListUsersUseCase } from "./ListUsersUseCase";


class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const users = await this.listUsersUseCase.execute();

    return response.json(users);
  }
}

export { ListUsersController }
