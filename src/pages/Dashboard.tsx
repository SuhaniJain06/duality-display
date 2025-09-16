import { AlertTriangle, CheckCircle, Clock, TrendingUp, MapPin, Filter } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const recentIssues = [
  {
    id: 1,
    title: "Open drain without cover - children safety risk",
    description: "Open drainage system near the school has no covering. Several children have...",
    status: "open",
    priority: "high",
    location: "Near Government School, Gurgaon",
    time: "Sep 7",
    acknowledged: 6
  },
  {
    id: 2, 
    title: "Street light malfunction on Main Road",
    description: "Multiple street lights not working, creating safety concerns at night...",
    status: "in-progress", 
    priority: "medium",
    location: "Main Road, Sector 14",
    time: "Sep 6",
    acknowledged: 3
  },
  {
    id: 3,
    title: "Pothole repair needed urgently",
    description: "Large pothole causing traffic disruption and vehicle damage...",
    status: "resolved",
    priority: "high", 
    location: "Park Street Junction",
    time: "Sep 5",
    acknowledged: 8
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Civic Issues Dashboard</h1>
        <p className="text-muted-foreground">Real-time monitoring of community-reported issues</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Issues"
          value="21"
          icon={AlertTriangle}
          change="↗ 12% this month"
          changeType="positive"
          variant="info"
        />
        <MetricCard
          title="Resolved Issues"
          value="4"
          icon={CheckCircle}
          change="↗ 8% this month"
          changeType="positive"
          variant="success"
        />
        <MetricCard
          title="In Progress"
          value="7"
          icon={Clock}
          change="↗ 15% vs last week"
          changeType="neutral"
          variant="warning"
        />
        <MetricCard
          title="Resolution Rate"
          value="19%"
          icon={TrendingUp}
          change="↗ 5% vs last month"
          changeType="positive"
          variant="success"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Issue Map */}
        <Card className="lg:col-span-2 bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Issue Map</CardTitle>
              <CardDescription>Geographic distribution of reported issues</CardDescription>
            </div>
            <Select defaultValue="streetlights">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="streetlights">Street Lights</SelectItem>
                <SelectItem value="potholes">Potholes</SelectItem>
                <SelectItem value="drainage">Drainage</SelectItem>
                <SelectItem value="garbage">Garbage</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive map would be displayed here</p>
                <p className="text-sm text-muted-foreground">Showing street lights issues in the area</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
            <CardDescription>Latest community reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="border border-border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-sm leading-tight">{issue.title}</h4>
                  <Badge 
                    variant={issue.priority === "high" ? "destructive" : issue.priority === "medium" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {issue.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{issue.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{issue.location}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      issue.status === "resolved" ? "text-success border-success" :
                      issue.status === "in-progress" ? "text-warning border-warning" :
                      "text-info border-info"
                    }`}
                  >
                    {issue.status === "open" ? "open drain" : 
                     issue.status === "in-progress" ? "acknowledged" : "resolved"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{issue.time}</span>
                  <span>👥 {issue.acknowledged}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}