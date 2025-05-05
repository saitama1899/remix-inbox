import { json, type ActionFunctionArgs } from "@remix-run/node"
import { db } from "models"

export async function action({ request }: ActionFunctionArgs) {
  const { id, label } = await request.json()

  const email = await db.Email.findByPk(id)
  const tag = await db.Tag.findOne({ where: { name: label } })

  if (!email || !tag) return json({ error: "Invalid email or tag" }, { status: 400 })

  const hasTag = await email.hasTag(tag)

  if (hasTag) {
    await email.removeTag(tag)
  } else {
    await email.addTag(tag)
  }

  return json({ success: true })
}
