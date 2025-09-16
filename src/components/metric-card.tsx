import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  variant?: "default" | "success" | "warning" | "info"
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = "neutral",
  variant = "default" 
}: MetricCardProps) {
  const getIconColor = () => {
    switch (variant) {
      case "success": return "text-success"
      case "warning": return "text-warning"
      case "info": return "text-info"
      default: return "text-primary"
    }
  }

  const getChangeColor = () => {
    switch (changeType) {
      case "positive": return "text-success"
      case "negative": return "text-destructive"
      default: return "text-muted-foreground"
    }
  }

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-card-foreground">{value}</p>
            {change && (
              <Badge variant="secondary" className={`${getChangeColor()} bg-transparent`}>
                {change}
              </Badge>
            )}
          </div>
          <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ${getIconColor()}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}