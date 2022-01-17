import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";
import { hash } from "bcrypt";

let connection: Connection;
describe("Create User Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create an user", async () => {
    const userData = {
      name: "User Test",
      email: "user@test.com",
      password: "123456"
    };

    userData.password = await hash(userData.password, 10);
    const response = await request(app).post("/users").send(userData);
    const user = response.body;

    expect(response.statusCode).toBe(201);
    expect(user).toHaveProperty("id");
    expect(user.name).toBe("User Test");
    expect(user.password).toBeUndefined();
  });

  it("should not be able to create a user with a already used email.", async () => {
    const userData = {
      name: "User Test",
      email: "user@test.com",
      password: "123456"
    };

    userData.password = await hash(userData.password, 10);

    await request(app).post("/users").send(userData);
    const response = await request(app).post("/users").send(userData);

    expect(response.statusCode).toBe(422);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The email provided is already in use.");
  });
});
