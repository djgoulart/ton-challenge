import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("Update User Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to update a user", async () => {
    const userData = {
      name: "User Test",
      email: "user@test.com",
      password: "123456"
    };

    const response = await request(app).post("/users").send(userData);
    const user = response.body;

    const authResponse = await request(app).post("/sessions").send({
      email: userData.email,
      password: userData.password
    });

    const { token } = authResponse.body;

    const updateResponse = await request(app).put(`/users/${user.id}`)
      .send({
        email: "email@updated.com"
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const updatedUser = updateResponse.body;

    expect(updateResponse.statusCode).toBe(200);
    expect(updatedUser.email).toBe("email@updated.com");
  });

  it("Shouldn't be able to update with a already used email", async () => {
    const userData = {
      name: "User Test",
      email: "user1@test.com",
      password: "123456"
    };

    const user2Data = {
      name: "User 2 Test",
      email: "user2@test.com",
      password: "123456"
    };

    const user1Response = await request(app).post("/users").send(userData);
    const user2Response = await request(app).post("/users").send(user2Data);

    const user = user1Response.body;

    const authResponse = await request(app).post("/sessions").send({
      email: userData.email,
      password: userData.password
    });

    const { token } = authResponse.body;

    const updateResponse = await request(app).put(`/users/${user.id}`)
      .send({
        email: "user2@test.com"
      })
      .set({
        Authorization: `Bearer ${token}`
      });


    expect(updateResponse.statusCode).toBe(422);
  });

});
