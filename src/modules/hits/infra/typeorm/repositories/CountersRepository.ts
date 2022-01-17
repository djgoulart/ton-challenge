import { getRepository, Repository, UpdateResult } from "typeorm";

import { Counter } from "@modules/hits/infra/typeorm/entities/Counter";
import {
  ICreateCounterDTO,
  IUpdateCounterDTO,
  ICountersRepository
} from "@modules/hits/repositories/ICountersRepository";


class CountersRepository implements ICountersRepository {
  private repository: Repository<Counter>;

  constructor() {
    this.repository = getRepository(Counter);
  }

  async create({ id, namespace, hits }: ICreateCounterDTO): Promise<Counter> {
    const counter = this.repository.create({
      id,
      namespace,
      hits
    });

    const newCounter = await this.repository.save(counter)

    return newCounter;
  }

  async update({ id, hits }: IUpdateCounterDTO): Promise<Counter> {
    await this.repository.update(id, { hits });

    const counter = await this.repository.findOne(id);

    return counter;
  }

  async list(): Promise<Counter[]> {
    const counters = await this.repository.find();

    return counters;
  }

  async findById(id: string): Promise<Counter> {
    const counter = await this.repository.findOne(id);

    return counter;
  }

  async findByNamespace(namespace: string): Promise<Counter> {
    const counter = await this.repository.findOne({ namespace });

    return counter;
  }
}

export { CountersRepository }
