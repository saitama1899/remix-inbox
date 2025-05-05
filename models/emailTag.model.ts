import { DataTypes, Model } from "sequelize";
import { sequelize } from "../lib/db";

export class EmailTag extends Model {
	public emailId!: number;
	public tagId!: number;
}

EmailTag.init(
	{
		emailId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		tagId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "EmailTag",
		tableName: "email_tags",
		timestamps: false,
	}
);
