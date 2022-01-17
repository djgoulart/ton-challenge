import { AppError } from "@shared/errors/AppError";
import { v4 as uuidV4 } from "uuid";

import { InMemoryUsersRepository } from "@modules/account/repositories/inMemory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;


describe("Update User", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    updateUserUseCase = new UpdateUserUseCase(inMemoryUsersRepository);
  })

  it("should be able to update a user", async () => {
    const userData = {
      name: "test user",
      email: "test@testmail.com",
      password: "123test"
    };

    await createUserUseCase.execute(userData);

    const user = await inMemoryUsersRepository.findByEmail(userData.email);

    await updateUserUseCase.execute({
      id: user.id,
      dataToUpdate: {
        name: "user updated name",
        password: "updated_password",
        email: "updated@email.com",
      }
    });

    const updatedUser = await inMemoryUsersRepository.findByEmail("updated@email.com");

    expect(updatedUser).toHaveProperty("id");
    expect(updatedUser).toHaveProperty("name");
    expect(updatedUser).toHaveProperty("email");

    expect(user.id).toBe(updatedUser.id);
    expect(updatedUser.name).toBe("user updated name");

  });

  it("shouldn't be able to update a non-existing user", async () => {
    expect(async () => {

      const id = uuidV4();

      await updateUserUseCase.execute({
        id,
        dataToUpdate: {
          name: "user updated name",
        }
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("shouldn't be able to update with a already used email", async () => {
    expect(async () => {

      const user1Data = {
        name: "test user 1",
        email: "test@testmail.com",
        password: "123test"
      };
      const user2Data = {
        name: "test user 2",
        email: "test2@testmail.com",
        password: "123test"
      };

      await createUserUseCase.execute(user1Data);
      await createUserUseCase.execute(user2Data);

      const updateUser2 = await inMemoryUsersRepository.findByEmail("test2@testmail.com");

      await updateUserUseCase.execute({
        id: updateUser2.id,
        dataToUpdate: {
          email: user1Data.email,
        }
      });


    }).rejects.toBeInstanceOf(AppError);
  });

});
