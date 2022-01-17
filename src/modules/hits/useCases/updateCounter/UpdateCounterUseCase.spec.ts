import { v4 as uuidV4 } from "uuid";
import { AppError } from "@shared/errors/AppError";
import { InMemoryCountersRepository } from "@modules/hits/repositories/inMemory/InMemoryCountersRepository";
import { CreateCounterUseCase } from "../createCounter/CreateCounterUseCase";
import { UpdateCounterUseCase } from "./UpdateCounterUseCase";


let createCounterUseCase: CreateCounterUseCase;
let updateCounterUseCase: UpdateCounterUseCase;
let inMemoryCountersRepository: InMemoryCountersRepository;


describe("Update Counters", () => {

  beforeEach(() => {
    inMemoryCountersRepository = new InMemoryCountersRepository();
    createCounterUseCase = new CreateCounterUseCase(inMemoryCountersRepository);
    updateCounterUseCase = new UpdateCounterUseCase(inMemoryCountersRepository);
  })

  it("should be able to update a counter", async () => {
    const counterData = {
      namespace: "tobe.updated.com",
    };

    const counter = await createCounterUseCase.execute(counterData);
    const hitsBefore = counter.hits;

    const updated = await updateCounterUseCase.execute({ id: counter.id });
    const hitsAfter = updated.hits;


    expect(updated.id).toBe(counter.id);
    expect(hitsBefore).toBeLessThan(hitsAfter);
  });

  it("should not be able to update a non-existing counter", async () => {
    expect(async () => {

      const wrongCounterId = uuidV4();
      await updateCounterUseCase.execute({ id: wrongCounterId });

    }).rejects.toBeInstanceOf(AppError);

  });

});
