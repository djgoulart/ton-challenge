import { User } from "../../entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  list(): Promise<User[]>;
  create({ name, email, password }: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO }
