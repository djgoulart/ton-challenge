import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

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

  it("Should be able to update an counter", async () => {
    const userData = {
      namespace: "new-counter.com",
    };

    const newCounterResponse = await request(app).post("/counter").send(userData);
    const counter = newCounterResponse.body;

    const hitsBefore = counter.hits;

    const updateCounterResponse = await request(app).put(`/counter/${counter.id}`);
    const updatedCounter = updateCounterResponse.body;

    const hitsAfter = updateCounterResponse.body.hits;

    expect(updateCounterResponse.statusCode).toBe(200);
    expect(updatedCounter).toHaveProperty("id");
    expect(updatedCounter.id).toBe(counter.id);
    expect(hitsBefore).toBeLessThan(hitsAfter);
  });

  it("Should not be able to update an non-existing counter", async () => {
    const wrongCounterId = uuidV4()

    const response = await request(app).put(`/counter/${wrongCounterId}`);

    expect(response.statusCode).toBe(404);

  });

});
