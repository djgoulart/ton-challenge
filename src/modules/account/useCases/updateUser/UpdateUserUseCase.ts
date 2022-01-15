import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

import { IUsersRepository } from "../../repositories/contracts/IUsersRepository";

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

  async execute({ id, dataToUpdate }: IRequest): Promise<void> {
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

    await this.usersRepository.update({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    });

  }
}

export { UpdateUserUseCase };
