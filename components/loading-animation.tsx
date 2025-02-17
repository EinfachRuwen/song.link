import { Loader2 } from "lucide-react"

export function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center h-32">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  )
}

