import { createMocks } from "node-mocks-http";
import { faker } from "@faker-js/faker";

import handleRegister from "../../src/pages/api/auth/register";
import handleLogin from "../../src/pages/api/auth/login";

import { NextApiRequest, NextApiResponse } from "next";

describe("/auth/register", () => {
  test("Login with valid user", async () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const { req: registerRequest, res: registerResponse } = createMocks<
      NextApiRequest,
      NextApiResponse
    >({
      method: "POST",
      body: user,
    });

    await handleRegister(registerRequest, registerResponse);
    expect(registerResponse.statusCode).toBe(201);

    const { req: loginRequest, res: loginResponse } = createMocks<
      NextApiRequest,
      NextApiResponse
    >({
      method: "POST",
      body: {
        email: user.email,
        password: user.password,
      },
    });

    await handleLogin(loginRequest, loginResponse);
    expect(loginResponse.statusCode).toBe(200);
  });

  // |-------------------------------------------------------------------------|

  test("Can't login with invalid credentials", async () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const { req: registerRequest, res: registerResponse } = createMocks<
      NextApiRequest,
      NextApiResponse
    >({
      method: "POST",
      body: user,
    });

    await handleRegister(registerRequest, registerResponse);
    expect(registerResponse.statusCode).toBe(201);

    const { req: loginRequest, res: loginResponse } = createMocks<
      NextApiRequest,
      NextApiResponse
    >({
      method: "POST",
      body: {
        email: user.email,
        password: user.email,
      },
    });

    await handleLogin(loginRequest, loginResponse);

    expect(loginResponse.statusCode).toBe(401);
    expect(loginResponse._getData()).toBe(
      JSON.stringify({
        message: "Invalid email or password.",
      })
    );
  });
});
