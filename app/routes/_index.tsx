import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { Mail } from "~/components/mail/mail"
import { accounts, mails } from "~/data/mail-mock"

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "Remix Inbox" },
		{ name: "description", content: "Welcome to your Inbox!" },
	];
};

// 👇 Server-side loader para leer cookies
export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("cookie") || ""
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((cookie) => {
      const [key, ...rest] = cookie.trim().split("=")
      return [key, decodeURIComponent(rest.join("="))]
    })
  )

  const defaultLayout = cookies["react-resizable-panels:layout:mail"]
    ? JSON.parse(cookies["react-resizable-panels:layout:mail"])
    : undefined

  const defaultCollapsed = cookies["react-resizable-panels:collapsed"]
    ? JSON.parse(cookies["react-resizable-panels:collapsed"])
    : undefined

  return json({ defaultLayout, defaultCollapsed })
}

export default function InboxPage() {
  const { defaultLayout, defaultCollapsed } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/mail-dark.png"
          alt="Mail"
          className="hidden dark:block w-full h-auto"
        />
        <img
          src="/examples/mail-light.png"
          alt="Mail"
          className="block dark:hidden w-full h-auto"
        />
      </div>
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
