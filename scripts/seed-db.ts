import 'dotenv/config';
import { db } from "models";
import { seedMails } from "../seeds/seed-mails";

async function main() {
  try {
    console.log("⏳ Seeding database...");
    await db.sequelize.sync({ force: false });
    // TODO: Iterar sobre todos los seeds
    await seedMails();
    console.log("✅ Database seeded successfully");
  } catch (err) {
    console.error("❌ Failed to seed database:", err);
    process.exit(1);
  } finally {
    await db.sequelize.close();
  }
}

main();
