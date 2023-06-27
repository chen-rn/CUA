import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const exampleUser = await prisma.user.upsert({
    where: {
      id: "example_user_id",
    },
    update: {},
    create: {
      id: "example_user_id",
      email: "example@example.com",
      name: "example_name",
    },
  });
  const firstEntry = await prisma.entry.upsert({
    where: {
      id: "example_entry_id",
    },
    update: {},
    create: {
      id: "example_entry_id",
      entryDay: new Date(),
      urlFrontPhotoThumbnail: "https://www.google.com",
      urlFrontPhotoHD: "https://www.google.com",
      urlBackPhotoThumbnail: "https://www.google.com",
      urlBackPhotoHD: "https://www.google.com",
      user: {
        connect: {
          id: exampleUser.id,
        },
      },
    },
  });
  console.log({ firstEntry });
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
