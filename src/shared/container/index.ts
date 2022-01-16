import { container } from "tsyringe";

import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { CountersRepository } from "@modules/hits/infra/typeorm/repositories/CountersRepository";
import { ICountersRepository } from "@modules/hits/repositories/ICountersRepository";


container.registerSingleton<IUsersRepository>(
  "UsersRepository", UsersRepository
);

container.registerSingleton<ICountersRepository>(
  "CountersRepository", CountersRepository
);

