import request from "supertest";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("Create Counter Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create an counter", async () => {
    const userData = {
      namespace: "new-counter.com",
    };

    const response = await request(app).post("/counter").send(userData);
    const counter = response.body;

    expect(response.statusCode).toBe(201);
    expect(counter).toHaveProperty("id");
    expect(counter.namespace).toBe(userData.namespace);
  });


});
