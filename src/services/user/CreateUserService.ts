import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    constructor(private usersRepository: IUsersRepository) { }

    execute({ name, email, password }: IRequest): void {
        const userEmailAlreadyExists = this.usersRepository.findByEmail(email);

        if (userEmailAlreadyExists) {
            throw new Error("The email provided is already in use.");
        }

        this.usersRepository.create({ name, email, password })
    }
}

export { CreateUserService };
