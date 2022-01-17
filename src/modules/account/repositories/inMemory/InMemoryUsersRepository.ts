import { hash } from "bcrypt";

import { User } from "@modules/account/infra/typeorm/entities/User";
import { ICreateUserDTO, IUpdateUserDTO, IUsersRepository } from "../IUsersRepository";


class InMemoryUsersRepository implements IUsersRepository {

  users: User[] = [];

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    const hashPassword = await hash(password, 10);

    Object.assign(user, { name, email, password: hashPassword });

    this.users.push(user);
    return user;
  }

  async update({ id, name, email, password }: IUpdateUserDTO): Promise<User> {

    const user = this.users.find((user) => user.id === id);

    Object.assign(user, { name, email, password });

    return user;
  }

}


export { InMemoryUsersRepository }
