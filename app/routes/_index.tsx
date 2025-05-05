import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { Mail } from "~/components/mail/mail"
import { accounts } from "~/data/mail-mock"

import type { MetaFunction } from "@remix-run/node";
import { db } from "models"

export const meta: MetaFunction = () => {
	return [
		{ title: "Remix Inbox" },
		{ name: "description", content: "Welcome to your Inbox!" },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("cookie") || ""
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [k, ...v] = c.trim().split("=")
      return [k, decodeURIComponent(v.join("="))]
    })
  )

  const defaultLayout = cookies["react-resizable-panels:layout:mail"]
    ? JSON.parse(cookies["react-resizable-panels:layout:mail"])
    : undefined

  const defaultCollapsed = cookies["react-resizable-panels:collapsed"]
    ? JSON.parse(cookies["react-resizable-panels:collapsed"])
    : undefined

  const emails = await db.Email.findAll({
    include: {
      model: db.Tag,
			as: "tags",
      through: { attributes: [] }, 
    },
    order: [["createdAt", "DESC"]],
  })
	console.log("emails", emails)
  const mails = emails.map((email) => ({
    id: email.id.toString(),
    name: email.email,
    email: email.email,
    subject: email.subject,
    text: email.body,
    date: email.createdAt,
    read: email.read,
    labels: (email.tags || []).map((t) => t.name),
  }))

  return json({ defaultLayout, defaultCollapsed, mails })
}

export default function InboxPage() {
  const { defaultLayout, defaultCollapsed, mails } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  )
}
