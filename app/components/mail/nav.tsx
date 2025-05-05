import { LucideIcon } from "lucide-react"
import { Link } from "@remix-run/react"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip"

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    href: string
    label?: string
    icon: LucideIcon
    variant: "default" | "ghost"
    disabled?: boolean
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          const isDisabled = link.disabled

          const commonClasses = cn(
            buttonVariants({ variant: link.variant, size: isCollapsed ? "icon" : "sm" }),
            isCollapsed ? "h-9 w-9" : "justify-start",
            link.variant === "default" &&
              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
            isDisabled &&
              "pointer-events-none opacity-50 text-muted-foreground hover:text-muted-foreground"
          )

          const content = (
            <>
              <link.icon className={cn(isCollapsed ? "h-4 w-4" : "mr-2 h-4 w-4")} />
              {!isCollapsed && link.title}
              {!isCollapsed && link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </>
          )

          if (isCollapsed) {
            return (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    aria-disabled={isDisabled}
                    className={commonClasses}
                  >
                    {content}
                    <span className="sr-only">{link.title}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            )
          }

          return isDisabled ? (
            <div key={index} aria-disabled className={commonClasses}>
              {content}
            </div>
          ) : (
            <Link key={index} to={link.href} className={commonClasses}>
              {content}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
