import { PrismaClient } from "@prisma/client";
import { hash } from "../src/utils/password/hash";
const prisma = new PrismaClient();

async function main() {
  const henrique = await prisma.user.create({
    data: {
      name: "Henrique",
      email: "henrique@gmail.com",
      password: hash("henrique123"),
    },
  });
  const ademir = await prisma.user.create({
    data: {
      name: "Ademir",
      email: "ademir@gmail.com",
      password: hash("ademir"),
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
