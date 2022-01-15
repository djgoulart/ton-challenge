import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCounterUseCase } from "./UpdateCounterUseCase";


class UpdateCounterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateCounterUseCase = container.resolve(UpdateCounterUseCase);

    const counter = await updateCounterUseCase.execute({ id })

    return response.json(counter);
  }
}

export { UpdateCounterController };
