import { InMemoryUsersRepository } from "@modules/account/repositories/inMemory/InMemoryUsersRepository";
import { ListUsersUseCase } from "./ListUsersUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let listUsersUseCase: ListUsersUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;


describe("List All Users", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    listUsersUseCase = new ListUsersUseCase(inMemoryUsersRepository);
  })

  it("should be able to list all users", async () => {
    const userData = {
      name: "test user",
      email: "test@testmail.com",
      password: "123test"
    };

    await createUserUseCase.execute(userData);

    const users = await listUsersUseCase.execute();

    expect(users.length).toBe(1);
    expect(users[0]).toHaveProperty("id");
    expect(users[0].name).toBe("test user");
    expect(users[0].email).toBe("test@testmail.com");

  });

});
