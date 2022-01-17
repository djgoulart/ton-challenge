import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowSignedUserUseCase } from "./ShowSignedUserUseCase";


class ShowSignedUserController {

  async handle(request: Request, response: Response): Promise<Response> {

    const showUserByIdUseCase = container.resolve(ShowSignedUserUseCase);

    const id = request.user_id;
    const user = await showUserByIdUseCase.execute(id);
    delete user.password;

    return response.json(user);
  }
}

export { ShowSignedUserController }
