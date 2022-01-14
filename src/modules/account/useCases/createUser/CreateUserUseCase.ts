import { IUsersRepository } from "../../repositories/contracts/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  async execute({ name, email, password }: IRequest): Promise<void> {
    const userEmailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userEmailAlreadyExists) {
      throw new Error("The email provided is already in use.");
    }

    await this.usersRepository.create({ name, email, password });
  }
}

export { CreateUserUseCase };
