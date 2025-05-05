import 'dotenv/config';
import { db } from "../models/index.js";

const sync = async () => {
	try {
		await db.sequelize.authenticate();
		await db.sequelize.sync({ alter: true });
		console.log("📦 Database synced successfully");
	} catch (err) {
		console.error("❌ Error syncing database:", err);
	} finally {
		await db.sequelize.close();
	}
};

sync();
