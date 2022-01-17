import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { User } from "@modules/account/infra/typeorm/entities/User";

interface IRequest {
  id: string;
  dataToUpdate: {
    name?: string;
    email?: string;
    password?: string;
  }
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ id, dataToUpdate }: IRequest): Promise<User> {
    const { name, email, password } = dataToUpdate;

    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError("User not found!", 404);
    }

    user.name = name ?? user.name;

    if (email) {
      const emailExists = await this.usersRepository.findByEmail(dataToUpdate.email);

      if (emailExists && emailExists.id !== id) {
        throw new AppError("Email already ben used", 422);
      }

      user.email = email;
    }

    if (password) {
      const hashPassword = await hash(password, 10)

      user.password = hashPassword;
    }

    return await this.usersRepository.update({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    });

  }
}

export { UpdateUserUseCase };
