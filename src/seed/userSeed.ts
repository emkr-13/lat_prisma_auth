import db from "../config/db";
import bcrypt from "bcryptjs";
const prisma = db;

// A `main` function so that we can use async/await
async function main() {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash("password123", salt);

  // Seed the database with users and posts
  const user1 = await prisma.user.create({
    data: {
      username: "admin",
      name: "Admin",
      password: hashedPassword,
    },
  });
  console.log(`Created users: ${user1.username}`);
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
