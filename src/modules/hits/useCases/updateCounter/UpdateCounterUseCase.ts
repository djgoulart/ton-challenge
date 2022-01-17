import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ICountersRepository } from "@modules/hits/repositories/ICountersRepository";
import { countApi } from "@shared/infra/services/CountApi";
import { Counter } from "@modules/hits/infra/typeorm/entities/Counter";

interface IUpdateCounter {
  id: string;
}

interface ICountApiHitResponse {
  data: {
    value: number;
  }
}

@injectable()
class UpdateCounterUseCase {

  constructor(
    @inject("CountersRepository")
    private countersRepository: ICountersRepository
  ) { }

  async execute({ id }: IUpdateCounter): Promise<Counter> {
    const counter = await this.countersRepository.findById(id);

    if (!counter) {
      throw new AppError("Counter not found", 404);
    }

    const { data } = await countApi.get(`hit/${counter.namespace}/${id}`) as ICountApiHitResponse;

    await this.countersRepository.update({ id, hits: data.value })

    counter.hits = data.value;

    return counter;
  }
}

export { UpdateCounterUseCase };
