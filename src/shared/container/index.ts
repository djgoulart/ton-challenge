import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/account/repositories/contracts/IUsersRepository";
import { UsersRepository } from "../../modules/account/repositories/UsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository", UsersRepository
)
