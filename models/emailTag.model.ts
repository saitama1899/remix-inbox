import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db";

export const EmailTag = sequelize.define(
	"EmailTag",
	{
		emailId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		tagId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
	},
	{
		tableName: "email_tags",
		timestamps: false,
	},
);
