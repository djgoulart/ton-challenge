import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCounterUseCase } from "./CreateCounterUseCase";


class CreateCounterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { namespace } = request.body;

    const createCounterUseCase = container.resolve(CreateCounterUseCase);

    const counter = await createCounterUseCase.execute({ namespace })

    return response.json(counter);
  }
}

export { CreateCounterController };
