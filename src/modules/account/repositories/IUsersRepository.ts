import { User } from "@modules/account/infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";

interface IUpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  list(): Promise<User[]>;
  create({ name, email, password }: ICreateUserDTO): Promise<User>;
  update({ id, name, email, password }: IUpdateUserDTO): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO, IUpdateUserDTO }
