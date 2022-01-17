import { inject, injectable } from "tsyringe";

import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(): Promise<User[]> {

    const users = await this.usersRepository.list();

    return users;
  }
}

export { ListUsersUseCase };
