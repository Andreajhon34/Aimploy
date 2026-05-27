import { auth } from "@/lib/auth";
import { PrismaClient, Prisma } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // const resume = await prisma.resume.findFirst({
  //   where: { userId: "d1yjLcGf1pnwHt8WlxXYDXtJTaez1hcd" },
  // });

  // const atsResult = await prisma.atsResult.findFirst({
  //   where: { userId: "d1yjLcGf1pnwHt8WlxXYDXtJTaez1hcd" },
  // });

  // await prisma.atsResult.update({
  //   where: { id: atsResult?.id },
  //   data: { resumeId: resume?.id },
  // });

  await prisma.atsResult.deleteMany();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
