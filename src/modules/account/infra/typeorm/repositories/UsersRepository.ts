import { getRepository, Repository } from "typeorm";
import { hash } from "bcrypt";

import { User } from "@modules/account/infra/typeorm/entities/User";
import { ICreateUserDTO, IUpdateUserDTO, IUsersRepository } from "@modules/account/repositories/IUsersRepository";


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {

    const hashPassword = await hash(password, 10);

    const user = this.repository.create({
      name,
      email,
      password: hashPassword
    });

    return await this.repository.save(user)
  }

  async update({ id, name, email, password }: IUpdateUserDTO): Promise<User> {
    await this.repository.update(id, { name, email, password });

    return await this.repository.findOne(id);

  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

}


export { UsersRepository }
