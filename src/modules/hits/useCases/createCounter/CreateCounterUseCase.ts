import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICountersRepository } from "../../repositories/contracts/ICountersRepository";
import { countApi } from "./../../../../services/CountApi";
import { Counter } from "../../entities/Counter";

interface ICreateCounter {
  namespace: string;
}

@injectable()
class CreateCounterUseCase {

  constructor(
    @inject("CountersRepository")
    private countersRepository: ICountersRepository
  ) { }

  async execute({ namespace }: ICreateCounter): Promise<Counter> {
    const namespaceAlreadyExists = await this.countersRepository.findByNamespace(namespace);

    if (namespaceAlreadyExists) {
      throw new AppError("Namespace already ben used", 422);
    }

    const { data } = await countApi.get(`create?namespace=${namespace}`);
    const { data: countValue } = await countApi.get(`get/${namespace}`);

    const counter = await this.countersRepository.create({
      id: data.key,
      namespace: data.namespace,
      hits: countValue.value
    });

    return counter;
  }
}

export { CreateCounterUseCase };
