import { User } from "./../model/User"
import { ICreateUserDTO, IUsersRepository } from "./IUsersRepository";


class PostgresUsersRepository implements IUsersRepository {
    findById(id: string): User {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): User {
        throw new Error("Method not implemented.");
    }
    list(): User[] {
        throw new Error("Method not implemented.");
    }
    create({ name, email, password }: ICreateUserDTO): void {
        throw new Error("Method not implemented.");
    }
}

export { PostgresUsersRepository };
