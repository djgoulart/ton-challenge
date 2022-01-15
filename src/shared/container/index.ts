import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/account/repositories/contracts/IUsersRepository";
import { UsersRepository } from "../../modules/account/repositories/UsersRepository";
import { ICountersRepository } from "../../modules/hits/repositories/contracts/ICountersRepository";
import { CountersRepository } from "../../modules/hits/repositories/CountersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository", UsersRepository
);

container.registerSingleton<ICountersRepository>(
  "CountersRepository", CountersRepository
);

