import { Request, Response } from "express";
import { container } from "tsyringe";
import { ViewCounterUseCase } from "./ViewCounterUseCase";


class ViewCounterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const viewCounterUseCase = container.resolve(ViewCounterUseCase);

    const counter = await viewCounterUseCase.execute({ id })

    return response.json(counter);
  }
}

export { ViewCounterController };
