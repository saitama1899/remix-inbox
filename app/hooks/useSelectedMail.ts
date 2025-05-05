import { useSearchParams } from "@remix-run/react"

export function useSelectedMail() {
  const [params, setParams] = useSearchParams()
  const selected = params.get("selected")

  const setSelected = (id: string | null) => {
    const newParams = new URLSearchParams(params)
    if (id) newParams.set("selected", id)
    else newParams.delete("selected")
    setParams(newParams)
  }

  return { selected, setSelected }
}
