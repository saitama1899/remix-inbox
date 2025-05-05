
import { mails } from "~/data/mail-mock";
import { db } from "models";

export async function seedMails() {
  for (const mail of mails) {
    const [email] = await db.Email.findOrCreate({
      where: { id: mail.id },
      defaults: {
        subject: mail.subject,
        body: mail.text,
        read: mail.read,
        createdAt: new Date(mail.date),
        email: mail.email,
        name: mail.name,
      },
    });

    for (const label of mail.labels) {
      const [tag] = await db.Tag.findOrCreate({
        where: { name: label },
      });

      await email.addTag(tag);
    }
  }
}
