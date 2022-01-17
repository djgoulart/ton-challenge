import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      type: process.env.NODE_ENV === "test" ? "sqlite" : defaultOptions.type,
      database: process.env.NODE_ENV === "test" ? ":memory:" : defaultOptions.database,
    })
  );
}
