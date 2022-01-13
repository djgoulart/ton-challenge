import { User } from "../model/User";


interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
}

class UsersRepository {

    private users: User[];

    constructor() {
        this.users = [];
    }

    create({ name, email, password }: ICreateUserDTO): void {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            created_at: new Date()
        });

        this.users.push(user);
    }

    list(): User[] {
        return this.users;
    }

    findById(id: string) {
        const user = this.users.find(user => user.id === id);
        return user;
    }

    findByEmail(email: string) {
        const user = this.users.find(user => user.email === email);
        return user;
    }

}


export { UsersRepository }
