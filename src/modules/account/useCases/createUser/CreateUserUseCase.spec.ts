import { AppError } from "@shared/errors/AppError";
import { InMemoryUsersRepository } from "@modules/account/repositories/inMemory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;


describe("Create User", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  })

  it("should be able to create a new user", async () => {
    const userData = {
      name: "test user",
      email: "test@testmail.com",
      password: "123test"
    };

    await createUserUseCase.execute(userData);
    const userCreated = await inMemoryUsersRepository.findByEmail(userData.email);

    expect(userCreated).toHaveProperty("id");

  });

  it("should not be able to create a user with a already used email.", async () => {

    expect(async () => {
      const userData = {
        name: "test user",
        email: "test@testmail.com",
        password: "123test"
      };

      await createUserUseCase.execute(userData);
      await createUserUseCase.execute(userData);

    }).rejects.toBeInstanceOf(AppError);

  });
});
