import { Loader2 } from "lucide-react"

export function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading TeamBuilder...</p>
      </div>
    </div>
  )
}
