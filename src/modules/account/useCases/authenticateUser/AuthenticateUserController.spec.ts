import request from "supertest";
import { Connection, getConnectionOptions } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import createConnection from "@shared/infra/typeorm";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Authenticate User Controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("123456", 10);

    await connection.query(`
      INSERT INTO USERS(id, name, email, password, created_at)
      values('${id}', 'test user', 'email@testuser.com', '${password}', 'now()')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to authenticate an user", async () => {

    const responseToken = await request(app)
      .post("/sessions")
      .send({
        email: 'email@testuser.com',
        password: '123456'
      });

    const { user } = responseToken.body;

    expect(responseToken.statusCode).toBe(200);
    expect(responseToken.body).toHaveProperty("token");
    expect(responseToken.body).toHaveProperty("user");

    expect(user.name).toBe('test user');
    expect(user.email).toBe('email@testuser.com');
  });

  it("Shouldn't be able to authenticate a non-existing user.", async () => {

    const responseToken = await request(app)
      .post("/sessions")
      .send({
        email: 'non-existing@testuser.com',
        password: '123456'
      });

    const { message } = responseToken.body;

    expect(responseToken.statusCode).toBe(401);
    expect(message).toBe("Email or password incorrect");
  });

  it("Shouldn't be able to authenticate a user with wrong password", async () => {

    const responseToken = await request(app)
      .post("/sessions")
      .send({
        email: 'email@testuser.com',
        password: 'wrong_password'
      });

    const { message } = responseToken.body;

    expect(responseToken.statusCode).toBe(401);
    expect(message).toBe("Email or password incorrect");
  });

});
