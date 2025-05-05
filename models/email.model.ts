import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from "sequelize";
import { sequelize } from "../lib/db";
import { Tag } from "types/email";

export class Email extends Model<InferAttributes<Email>, InferCreationAttributes<Email>> {
  declare id: CreationOptional<number>;
  declare subject: string;
  declare body: string;
	declare createdAt: Date;
	declare name: string;
	declare email: string;
  declare read: boolean;

  declare Tags?: NonAttribute<Tag[]>;
  declare addTag: (tag: Tag) => Promise<void>;
}

Email.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
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
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
  {
    tableName: "emails",
    sequelize,
  }
);
