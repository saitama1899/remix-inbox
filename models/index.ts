import { sequelize } from "lib/db";
import { Email } from "./email.model";
import { EmailTag } from "./emailTag.model";
import { Tag } from "./tag.model";
import dotenv from 'dotenv';

dotenv.config();

Email.belongsToMany(Tag, { through: EmailTag, foreignKey: "emailId" });
Tag.belongsToMany(Email, { through: EmailTag, foreignKey: "tagId" });

export const db = {
	sequelize,
	Email,
	Tag,
	EmailTag,
};
