import { sequelize } from "lib/db";
import { Email } from "./email.model";
import { Tag } from "./tag.model";
import { EmailTag } from "./emailTag.model";

Email.belongsToMany(Tag, { through: EmailTag, foreignKey: "emailId", as: "Tags" });
Tag.belongsToMany(Email, { through: EmailTag, foreignKey: "tagId" });

export const db = {
  sequelize,
  Email,
  Tag,
  EmailTag,
};
