import { json, type ActionFunctionArgs } from "@remix-run/node"
import { db } from "models"

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json()
  const { id, read } = body

  const email = await db.Email.findByPk(id)
  if (!email) return json({ error: "Email not found" }, { status: 404 })

  email.read = read
  await email.save()

  return json({ success: true })
}