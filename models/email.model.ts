import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db";

export const Email = sequelize.define(
	"Email",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		subject: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		read: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		tableName: "emails",
		timestamps: true,
	},
);
