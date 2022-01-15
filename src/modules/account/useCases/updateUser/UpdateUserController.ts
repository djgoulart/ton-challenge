import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
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

    await updateUserUseCase.execute({ id, dataToUpdate });

    return response.status(200).send();
  }
}

export { UpdateUserController }
