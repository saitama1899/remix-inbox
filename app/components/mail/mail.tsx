import * as React from "react"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react"

import { cn } from "~/lib/utils"
import { Input } from "~/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable"
import { Separator } from "~/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs"
import { TooltipProvider } from "~/components/ui/tooltip"
import { AccountSwitcher } from "./account-switcher"
import { MailDisplay } from "./mail-display"
import { MailList } from "./mail-list"
import { Nav } from "./nav"
import type { Mail } from "~/data/mail-mock"
import { useSelectedMail } from "~/hooks/useSelectedMail"

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  mails: Mail[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const { selected, setSelected } = useSelectedMail()
  const selectedMail = mails.find((item) => item.id === selected) || null

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[100vh] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`
          }}
          onResize={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Inbox",
                href: "/inbox",
                label: "128",
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Drafts",
                href: "/drafts",
                label: "9",
                icon: File,
                variant: "ghost",
                disabled: true,
              },
              {
                title: "Sent",
                href: "/sent",
                label: "",
                icon: Send,
                variant: "ghost",
                disabled: true,
              },
              {
                title: "Junk",
                href: "/junk",
                label: "23",
                icon: ArchiveX,
                variant: "ghost",
                disabled: true,
              },
              {
                title: "Trash",
                href: "/trash",
                label: "",
                icon: Trash2,
                variant: "ghost",
                disabled: true,
              },
              {
                title: "Archive",
                href: "/archive",
                label: "",
                icon: Archive,
                variant: "ghost",
                disabled: true,
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Social",
                href: "/social",
                label: "972",
                icon: Users2,
                variant: "ghost",
                disabled: true,
              },
              {
                title: "Updates",
                href: "/updates",
                label: "342",
                icon: AlertCircle,
                variant: "ghost",
                disabled: true,
              },
              {
                title: "Forums",
                href: "/forums",
                label: "128",
                icon: MessagesSquare,
                variant: "ghost",
                disabled: true,
              },
              {
                title: "Shopping",
                href: "/shopping",
                label: "8",
                icon: ShoppingCart,
                variant: "ghost",
                disabled: true,
              },
              {
                title: "Promotions",
                href: "/promotions",
                label: "21",
                icon: Archive,
                variant: "ghost",
                disabled: true,
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground text-gray-300" />
                  <Input placeholder="Search" className="pl-8" aria-disabled="true" disabled={true} />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList
                items={mails}
                selectedId={selected}
                onSelect={setSelected}
              />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList
                items={mails.filter((item) => !item.read)}
                selectedId={selected}
                onSelect={setSelected}
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <MailDisplay mail={selectedMail} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}