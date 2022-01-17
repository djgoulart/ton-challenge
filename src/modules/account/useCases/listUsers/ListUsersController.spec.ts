import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { hash } from "bcrypt";

let connection: Connection;
describe("List User Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to list all users", async () => {
    const userData = {
      name: "User Test",
      email: "user@test.com",
      password: "123456"
    };

    userData.password = await hash(userData.password, 10);
    await request(app).post("/users").send(userData);

    const response = await request(app).get("/users");
    const users = response.body;

    expect(response.statusCode).toBe(200);
    expect(users.length).toBe(1);
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("name");
    expect(users[0]).toHaveProperty("email");
  });

});
