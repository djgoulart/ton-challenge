import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/contracts/IUsersRepository";

class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.list();

    return users;
  }
}

export { ListUsersUseCase };
