import { AppError } from "@shared/errors/AppError";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { InMemoryUsersRepository } from "@modules/account/repositories/inMemory/InMemoryUsersRepository";
import { ShowSignedUserUseCase } from "./ShowSignedUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";


let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let showSignedUserUseCase: ShowSignedUserUseCase;


describe("Show Signed User", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    showSignedUserUseCase = new ShowSignedUserUseCase(inMemoryUsersRepository);
  })

  it("should be able to find an user by id", async () => {
    const userData = {
      name: "test user",
      email: "test@testmail.com",
      password: "123test"
    };

    const { id } = await createUserUseCase.execute(userData);

    const user = await showSignedUserUseCase.execute(id);

    expect(user).toHaveProperty("id");
    expect(user.id).toBe(id);
    expect(user).toBeInstanceOf(User);

  });

  it("shouldn't be able to find a user using a non-existent id", async () => {

    expect(async () => {
      await showSignedUserUseCase.execute("non-existing-id");
    }).rejects.toBeInstanceOf(AppError);

  });

});
