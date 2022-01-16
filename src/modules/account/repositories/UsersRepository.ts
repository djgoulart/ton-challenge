import { getRepository, Repository, UpdateResult } from "typeorm";
import { hash } from "bcrypt";

import { User } from "../entities/User";
import { ICreateUserDTO, IUpdateUserDTO, IUsersRepository } from "./contracts/IUsersRepository";


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<void> {

    const hashPassword = await hash(password, 10);

    const user = this.repository.create({
      name,
      email,
      password: hashPassword
    });

    await this.repository.save(user)
  }

  async update({ id, name, email, password }: IUpdateUserDTO): Promise<void> {
    await this.repository.update(id, { name, email, password });

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
