import { Counter } from "@modules/hits/infra/typeorm/entities/Counter";
import { ICountersRepository, ICreateCounterDTO, IUpdateCounterDTO } from "../ICountersRepository";


class InMemoryCountersRepository implements ICountersRepository {

  counters: Counter[] = [];

  async findById(id: string): Promise<Counter> {
    const counter = this.counters.find((counter) => counter.id === id);
    return counter;
  }

  async findByNamespace(namespace: string): Promise<Counter> {
    const counter = this.counters.find((counter) => counter.namespace === namespace);
    return counter;
  }

  async list(): Promise<Counter[]> {
    return this.counters;
  }

  async create({ id, namespace, hits }: ICreateCounterDTO): Promise<Counter> {
    const counter = new Counter();

    Object.assign(counter, { id, namespace, hits });

    this.counters.push(counter);
    return counter;
  }

  async update({ id }: IUpdateCounterDTO): Promise<Counter> {

    const counter = this.counters.find((counter) => counter.id === id);

    Object.assign(counter, { id });

    return counter;
  }

}


export { InMemoryCountersRepository }
