import { json } from "@remix-run/node"
import { db } from "models"

export async function loader() {
  const tags = await db.Tag.findAll()
  return json(tags)
}
