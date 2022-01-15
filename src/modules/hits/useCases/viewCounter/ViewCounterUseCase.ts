import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICountersRepository } from "../../repositories/contracts/ICountersRepository";
import { Counter } from "../../entities/Counter";
import { countApi } from "../../../../services/CountApi";

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

    const counterHits = Object.assign({}, counter, { hits })

    return counterHits;
  }
}

export { ViewCounterUseCase };
