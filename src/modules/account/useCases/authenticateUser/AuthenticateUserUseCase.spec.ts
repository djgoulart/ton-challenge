import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { InMemoryUsersRepository } from "@modules/account/repositories/inMemory/InMemoryUsersRepository";
import { CreateUserUseCase } from "@modules/account/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Authenticate User", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
  });


  it("should be able to authenticate an user", async () => {
    const userData: ICreateUserDTO = {
      name: 'user test',
      email: 'user@test.com',
      password: '1234',
    };

    await createUserUseCase.execute(userData);

    const authResult = await authenticateUserUseCase.execute({
      email: userData.email,
      password: userData.password
    });

    expect(authResult).toHaveProperty("token");
    expect(authResult).toHaveProperty("user");

  });


  it("It shouldn't be able to authenticate a non-existing user.", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@test.com',
        password: '1234'
      });
    }).rejects.toBeInstanceOf(AppError);
  });


  it("It shouldn't be able to authenticate a user with incorrect password.", async () => {
    expect(async () => {
      const userData: ICreateUserDTO = {
        name: 'user test',
        email: 'user@test.com',
        password: '1234',
      };

      await createUserUseCase.execute(userData);

      await authenticateUserUseCase.execute({
        email: userData.email,
        password: 'invalidpassword'
      });
    }).rejects.toBeInstanceOf(AppError);

  });
});
