import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("View Counter Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to view the hits off an counter", async () => {
    const userData = {
      namespace: "new-counter.com",
    };

    const newCounterResponse = await request(app).post("/counter").send(userData);
    const counter = newCounterResponse.body;

    await request(app).put(`/counter/${counter.id}`);
    await request(app).put(`/counter/${counter.id}`);

    const response = await request(app).get(`/counter/${counter.id}`);
    const counterInfo = response.body;

    expect(response.statusCode).toBe(200);
    expect(counterInfo.id).toBe(counter.id);
    expect(counterInfo.namespace).toBe(counter.namespace);
    expect(counterInfo.hits).toBe(2);
  });

  it("Should not be able to view the hits off an non-existing counter", async () => {

    const wrongCounterId = uuidV4()
    const response = await request(app).get(`/counter/${wrongCounterId}`);

    expect(response.statusCode).toBe(404);

  });

});
