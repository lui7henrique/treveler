import type { NextApiRequest, NextApiResponse } from "next";
import { isValidEmail } from "utils/email/valid";
import prisma from "lib/prisma";
import { User, Prisma } from "@prisma/client";

type ResponseData = {
  message: string;
  user?: User;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { body } = req;
  const { name, email } = body;

  const emptyBody = !name && !email;

  if (emptyBody) {
    return res
      .status(406)
      .json({ message: "Payload must be have name and e-mail!" });
  }

  const isEmailValid = isValidEmail(email);
  if (!isEmailValid) {
    return res
      .status(406)
      .json({ message: "Email must be a valid email (with @ and .domain)" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return res
      .status(201)
      .json({ message: "User created succesfully", user: user });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(403).json({ message: "E-mail already exists." });
      }
    }

    return res.status(500).json({ message: "Internal server error :(" });
  }
}
