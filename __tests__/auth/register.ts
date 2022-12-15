import { createMocks } from "node-mocks-http";
import { faker } from "@faker-js/faker";
import handleRegister from "../../src/pages/api/auth/register";
import { NextApiRequest, NextApiResponse } from "next";

describe("/auth/register", () => {
  test("Create a valid user", async () => {
    const body = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body,
    });

    await handleRegister(req, res);
    expect(res.statusCode).toBe(201);
  });

  // |-------------------------------------------------------------------------|

  test("Can't create user without fields", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body: {},
    });

    await handleRegister(req, res);
    expect(res.statusCode).toBe(406);
  });

  // |-------------------------------------------------------------------------|

  test("Can't create user with invalid e-mail", async () => {
    const body = {
      name: faker.name.fullName(),
      email: faker.internet.password(),
      password: faker.internet.password(),
    };

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body,
    });

    await handleRegister(req, res);
    expect(res.statusCode).toBe(406);
    expect(res._getData()).toBe(
      JSON.stringify({
        message: "Email must be a valid email (with @ and .domai)",
      })
    );
  });

  // |-------------------------------------------------------------------------|

  test("Can't create user with e-mail already exists", async () => {
    const body = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "POST",
      body,
    });

    await handleRegister(req, res);
    expect(res.statusCode).toBe(201);

    const { req: repeatedReq, res: repeteadRes } = createMocks<
      NextApiRequest,
      NextApiResponse
    >({
      method: "POST",
      body,
    });

    await handleRegister(repeatedReq, repeteadRes);
    expect(repeteadRes.statusCode).toBe(403);
  });
});
