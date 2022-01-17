import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { Counter } from "@modules/hits/infra/typeorm/entities/Counter";
import { ICountersRepository } from "@modules/hits/repositories/ICountersRepository";
import { countApi } from "@shared/infra/services/CountApi";

interface IViewCounter {
  id: string;
}

@injectable()
class ViewCounterUseCase {

  constructor(
    @inject("CountersRepository")
    private countersRepository: ICountersRepository
  ) { }

  async execute({ id }: IViewCounter): Promise<Counter> {
    const counter = await this.countersRepository.findById(id);

    if (!counter) {
      throw new AppError("Counter not found", 404);
    }

    const { data } = await countApi.get(`get/${counter.namespace}/${id}`);

    const hits = data.value;

    counter.hits = hits;

    return counter;
  }
}

export { ViewCounterUseCase };
