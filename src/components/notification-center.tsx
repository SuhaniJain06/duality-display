import { useState } from "react"
import { Bell, Settings, User, LogOut, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export function NotificationCenter() {
  const [notifications] = useState([
    { id: 1, title: "New issue reported", message: "Pothole on Main Street", time: "2 min ago", unread: true },
    { id: 2, title: "Issue resolved", message: "Street light fixed", time: "1 hour ago", unread: true },
    { id: 3, title: "Department update", message: "Public Works responded", time: "3 hours ago", unread: false },
  ])

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-accent">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs animate-pulse-soft"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-display">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
            <div className="flex w-full items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
              </div>
              {notification.unread && (
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce-subtle" />
              )}
            </div>
            <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function UserMenu() {
  const { toast } = useToast()

  const handleAction = (action: string) => {
    toast({
      title: "Action triggered",
      description: `${action} functionality would be implemented here`,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 hover:bg-accent">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="hidden sm:block font-medium">Citizen</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-display">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleAction("Profile")} className="gap-2">
          <User className="w-4 h-4" />
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("Settings")} className="gap-2">
          <Settings className="w-4 h-4" />
          Preferences
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleAction("Upgrade")} className="gap-2">
          <Zap className="w-4 h-4" />
          Upgrade Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleAction("Logout")} className="gap-2 text-destructive">
          <LogOut className="w-4 h-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}