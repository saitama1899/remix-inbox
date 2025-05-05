import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db";

export const Tag = sequelize.define(
	"Tag",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
	},
	{
		tableName: "tags",
		timestamps: true,
	},
);
