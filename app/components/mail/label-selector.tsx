// components/mail/label-selector.tsx
import { useEffect, useState } from "react"
import { Badge } from "~/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
} from "~/components/ui/command"
import { Button } from "~/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "~/lib/utils"
import type { Mail } from "~/data/mail-mock"
import { useFetcher } from "@remix-run/react"
import {
  Tag,
} from "lucide-react"

interface LabelSelectorProps {
  mail: Mail | null
}

export function LabelSelector({ mail }: LabelSelectorProps) {
  const fetcher = useFetcher()
  const [open, setOpen] = useState(false)
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    fetch("/tags")
      .then((res) => res.json())
      .then((tags) => setAllTags(tags.map((t: any) => t.name)))
  }, [])

  const toggleLabel = async (label: string) => {
    if (!mail) return
    await fetch("/toggle-label", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: mail.id, label }),
    })
    window.location.reload()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={!mail}
          title="Edit labels"
        >
          <span className="sr-only">Edit labels</span>
          <Tag className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search label..." />
          <CommandEmpty>No label found.</CommandEmpty>
          <CommandGroup heading="Available labels">
            {allTags.map((tag) => {
              if (!mail) return null
              const selected = mail.labels.includes(tag)
              return (
                <CommandItem
                  key={tag}
                  onSelect={() => toggleLabel(tag)}
                  className="flex justify-between"
                >
                  {tag}
                  {selected && <Check className="h-4 w-4" />}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
