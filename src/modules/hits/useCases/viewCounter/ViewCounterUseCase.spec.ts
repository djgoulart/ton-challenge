import { v4 as uuidV4 } from "uuid";
import { AppError } from "@shared/errors/AppError";
import { InMemoryCountersRepository } from "@modules/hits/repositories/inMemory/InMemoryCountersRepository";
import { CreateCounterUseCase } from "../createCounter/CreateCounterUseCase";
import { UpdateCounterUseCase } from "../updateCounter/UpdateCounterUseCase";
import { ViewCounterUseCase } from "./ViewCounterUseCase";

let createCounterUseCase: CreateCounterUseCase;
let updateCounterUseCase: UpdateCounterUseCase;
let viewCounterUseCase: ViewCounterUseCase;
let inMemoryCountersRepository: InMemoryCountersRepository;


describe("Create Counters", () => {

  beforeEach(() => {
    inMemoryCountersRepository = new InMemoryCountersRepository();
    createCounterUseCase = new CreateCounterUseCase(inMemoryCountersRepository);
    updateCounterUseCase = new UpdateCounterUseCase(inMemoryCountersRepository);
    viewCounterUseCase = new ViewCounterUseCase(inMemoryCountersRepository);
  })

  it("should be able to view the current hits from a counter", async () => {
    const counterData = {
      namespace: "test-namespace.com",
    };

    const newCounter = await createCounterUseCase.execute(counterData);

    await updateCounterUseCase.execute({ id: newCounter.id });
    await updateCounterUseCase.execute({ id: newCounter.id });

    const counter = await viewCounterUseCase.execute({ id: newCounter.id })

    expect(counter.id).toBe(newCounter.id);
    expect(counter.namespace).toBe(counter.namespace);
    expect(counter.hits).toBe(2);
  });

  it("should not be able to view the current hits from a non-existing counter", async () => {
    expect(async () => {

      const wrongCounterId = uuidV4();
      const counter = await viewCounterUseCase.execute({ id: wrongCounterId });

    }).rejects.toBeInstanceOf(AppError);
  });


});
