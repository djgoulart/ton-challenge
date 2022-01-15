import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICountersRepository } from "../../repositories/contracts/ICountersRepository";
import { countApi } from "../../../../services/CountApi";
import { Counter } from "../../entities/Counter";
import { UpdateResult } from "typeorm";

interface IUpdateCounter {
  id: string;
}

@injectable()
class UpdateCounterUseCase {

  constructor(
    @inject("CountersRepository")
    private countersRepository: ICountersRepository
  ) { }

  async execute({ id }: IUpdateCounter): Promise<void> {
    const counterExists = await this.countersRepository.findById(id);

    if (!counterExists) {
      throw new AppError("Counter not found", 404);
    }

    const { data } = await countApi.get(`hit/${counterExists.namespace}/${id}`);

    await this.countersRepository.update({ id, hits: data.value })

    return data;
  }
}

export { UpdateCounterUseCase };
