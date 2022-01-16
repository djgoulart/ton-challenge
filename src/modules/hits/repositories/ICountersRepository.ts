import { UpdateResult } from "typeorm";

import { Counter } from "@modules/hits/infra/typeorm/entities/Counter";

interface ICreateCounterDTO {
  id: string;
  namespace: string;
  hits: number;
}

interface IUpdateCounterDTO {
  id: string;
  hits: number;
}

interface ICountersRepository {
  findById(id: string): Promise<Counter>;
  findByNamespace(namespace: string): Promise<Counter>;
  list(): Promise<Counter[]>;
  create({ id, namespace }: ICreateCounterDTO): Promise<Counter>;
  update({ id }: IUpdateCounterDTO): Promise<UpdateResult>;
}

export { ICountersRepository, ICreateCounterDTO, IUpdateCounterDTO }
