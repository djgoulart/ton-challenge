import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { UpdateUserUseCase } from "./UpdateUserUseCase";


class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;
    const { name, email, password } = request.body;

    if (id !== request.user_id) {
      throw new AppError("Unauthorized", 401);
    }

    const dataToUpdate = { name, email, password };

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({ id, dataToUpdate });
    delete user.password;

    return response.status(200).json(user);
  }
}

export { UpdateUserController }
