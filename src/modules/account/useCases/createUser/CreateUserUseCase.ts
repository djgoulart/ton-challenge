import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

import { IUsersRepository } from "../../repositories/contracts/IUsersRepository";

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

  async execute({ name, email, password }: IRequest): Promise<void> {
    const userEmailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userEmailAlreadyExists) {
      throw new AppError("The email provided is already in use.", 422);
    }

    await this.usersRepository.create({ name, email, password });
  }
}

export { CreateUserUseCase };
