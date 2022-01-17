import { AppError } from "@shared/errors/AppError";
import { InMemoryCountersRepository } from "@modules/hits/repositories/inMemory/InMemoryCountersRepository";
import { CreateCounterUseCase } from "./CreateCounterUseCase";

let createCounterUseCase: CreateCounterUseCase;
let inMemoryCountersRepository: InMemoryCountersRepository;


describe("Create Counters", () => {

  beforeEach(() => {
    inMemoryCountersRepository = new InMemoryCountersRepository();
    createCounterUseCase = new CreateCounterUseCase(inMemoryCountersRepository);
  })

  it("should be able to create a new counter", async () => {
    const counterData = {
      namespace: "test-namespace.com",
    };

    const counter = await createCounterUseCase.execute(counterData);

    expect(counter).toHaveProperty("id");
    expect(counter).toHaveProperty("namespace");
    expect(counter.namespace).toBe("test-namespace.com");
    expect(counter.hits).toBe(0);
  });

  it("should no be able to create a new counter with duplicated namespace", async () => {
    expect(async () => {

      const counterData = {
        namespace: "test-namespace.com",
      };

      await createCounterUseCase.execute(counterData);
      await createCounterUseCase.execute(counterData);

    }).rejects.toBeInstanceOf(AppError)

  });

});
