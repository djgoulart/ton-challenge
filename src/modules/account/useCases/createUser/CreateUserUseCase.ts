import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { User } from "@modules/account/infra/typeorm/entities/User";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, email, password }: IRequest): Promise<User> {
    const userEmailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userEmailAlreadyExists) {
      throw new AppError("The email provided is already in use.", 422);
    }

    const user = await this.usersRepository.create({ name, email, password });

    return user;
  }
}

export { CreateUserUseCase };
