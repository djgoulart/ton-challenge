import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { Counter } from "@modules/hits/infra/typeorm/entities/Counter";
import { ICountersRepository } from "@modules/hits/repositories/ICountersRepository";
import { countApi } from "@shared/infra/services/CountApi";

interface ICreateCounter {
  namespace: string;
}

interface ICountApiResponse {
  data: {
    namespace: string;
    key: string;
    value: number;
  }
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

    const { data } = await countApi.get(`create?namespace=${namespace}`) as ICountApiResponse;

    const counter = await this.countersRepository.create({
      id: data.key,
      namespace: data.namespace,
      hits: Number(data.value)
    });

    return counter;
  }
}

export { CreateCounterUseCase };
