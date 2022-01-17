import request from "supertest";
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "@shared/infra/typeorm";
import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("Show Signed Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();

  });

  beforeEach(async () => {
    await connection.runMigrations();
  })

  afterEach(async () => {
    await connection.dropDatabase();
  })

  afterAll(async () => {

    await connection.close();
  });

  it("Should be able to show a user data", async () => {
    const userData = {
      name: "User Test",
      email: "user@test.com",
      password: "123456"
    };

    userData.password = await hash(userData.password, 10);
    const newUser = await request(app).post("/users").send(userData);
    const user = newUser.body;

    const tokenResponse = await request(app).post("/sessions").send({
      email: userData.email,
      password: userData.password
    });

    const { token } = tokenResponse.body;

    const response = await request(app).get(`/users/me`).set({
      Authorization: `Bearer ${token}`
    });


    expect(response.statusCode).toBe(200);
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
  });

  it("Shouldn't be able to show data from a non-existing user", async () => {
    const userData = {
      name: "User Test",
      email: "another@test.com",
      password: "123456"
    };

    await request(app).post("/users").send(userData);

    const tokenResponse = await request(app).post("/sessions").send({
      email: "invalid@test.com",
      password: "123456"
    });

    const { token } = tokenResponse.body;


    const response = await request(app).get(`/users/me`).set({
      Authorization: `Bearer ${token}`
    });

    expect(response.statusCode).toBe(401);
  });

});
