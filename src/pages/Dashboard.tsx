import { useState, useMemo } from "react"
import { AlertTriangle, CheckCircle, Clock, TrendingUp, MapPin, Eye, MessageSquare, ThumbsUp, MoreHorizontal } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

const allIssues = [
  {
    id: 1,
    title: "Open drain without cover - children safety risk",
    description: "Open drainage system near the school has no covering. Several children have almost fallen in. This is a serious safety hazard that needs immediate attention.",
    status: "open",
    priority: "high",
    category: "drainage",
    location: "Near Government School, Gurgaon",
    time: "Sep 7",
    acknowledged: 6,
    comments: 4,
    views: 23,
    likes: 8
  },
  {
    id: 2, 
    title: "Street light malfunction on Main Road",
    description: "Multiple street lights not working, creating safety concerns at night. Citizens feel unsafe walking in this area after dark.",
    status: "in-progress", 
    priority: "medium",
    category: "streetlights",
    location: "Main Road, Sector 14",
    time: "Sep 6",
    acknowledged: 3,
    comments: 2,
    views: 15,
    likes: 5
  },
  {
    id: 3,
    title: "Pothole repair needed urgently",
    description: "Large pothole causing traffic disruption and vehicle damage. Several accidents have been reported due to this road condition.",
    status: "resolved",
    priority: "high", 
    category: "potholes",
    location: "Park Street Junction",
    time: "Sep 5",
    acknowledged: 8,
    comments: 6,
    views: 45,
    likes: 12
  },
  {
    id: 4,
    title: "Garbage collection irregular in residential area",
    description: "Waste bins overflowing for days, creating hygiene issues and attracting pests.",
    status: "open",
    priority: "medium",
    category: "garbage",
    location: "Green Valley Apartments",
    time: "Sep 4",
    acknowledged: 2,
    comments: 1,
    views: 8,
    likes: 3
  },
  {
    id: 5,
    title: "Traffic signal timing needs adjustment",
    description: "Long wait times causing traffic congestion during peak hours.",
    status: "in-progress",
    priority: "low",
    category: "traffic",
    location: "Central Square",
    time: "Sep 3",
    acknowledged: 5,
    comments: 3,
    views: 28,
    likes: 7
  }
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<any>({})
  const [mapFilter, setMapFilter] = useState("streetlights")
  const { toast } = useToast()

  const filteredIssues = useMemo(() => {
    return allIssues.filter(issue => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        if (
          !issue.title.toLowerCase().includes(searchLower) &&
          !issue.description.toLowerCase().includes(searchLower) &&
          !issue.location.toLowerCase().includes(searchLower)
        ) {
          return false
        }
      }

      // Status filter
      if (filters.status && issue.status !== filters.status) {
        return false
      }

      // Priority filter  
      if (filters.priority && issue.priority !== filters.priority) {
        return false
      }

      // Category filter
      if (filters.category && issue.category !== filters.category) {
        return false
      }

      return true
    })
  }, [searchQuery, filters])

  const handleIssueAction = (action: string, issueId: number) => {
    toast({
      title: "Action performed",
      description: `${action} for issue #${issueId}`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-success text-success-foreground border-success">Resolved</Badge>
      case "in-progress":
        return <Badge className="bg-warning text-warning-foreground border-warning">In Progress</Badge>
      case "open":
        return <Badge className="bg-info text-info-foreground border-info">Open</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive" className="text-xs">High</Badge>
      case "medium":
        return <Badge variant="default" className="text-xs">Medium</Badge>
      case "low":
        return <Badge variant="secondary" className="text-xs">Low</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{priority}</Badge>
    }
  }
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-display font-bold text-foreground tracking-tight">
          Civic Issues Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Real-time monitoring of community-reported issues
        </p>
      </div>

      {/* Search and Filters */}
      <SearchBar 
        onSearch={setSearchQuery}
        onFilterChange={setFilters}
        className="animate-slide-in"
      />

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <MetricCard
            title="Total Issues"
            value={allIssues.length}
            icon={AlertTriangle}
            change="↗ 12% this month"
            changeType="positive"
            variant="info"
          />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <MetricCard
            title="Resolved Issues"
            value={allIssues.filter(i => i.status === "resolved").length}
            icon={CheckCircle}
            change="↗ 8% this month"
            changeType="positive"
            variant="success"
          />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <MetricCard
            title="In Progress"
            value={allIssues.filter(i => i.status === "in-progress").length}
            icon={Clock}
            change="↗ 15% vs last week"
            changeType="neutral"
            variant="warning"
          />
        </div>
        <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <MetricCard
            title="Resolution Rate"
            value="19%"
            icon={TrendingUp}
            change="↗ 5% vs last month"
            changeType="positive"
            variant="success"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Issue Map */}
        <Card className="lg:col-span-2 bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-xl">Issue Map</CardTitle>
              <CardDescription>Geographic distribution of reported issues</CardDescription>
            </div>
            <Select value={mapFilter} onValueChange={setMapFilter}>
              <SelectTrigger className="w-40 bg-background">
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
            <div className="aspect-video bg-gradient-to-br from-muted via-muted/50 to-background rounded-xl border border-border/50 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-success/5" />
              <div className="text-center z-10">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce-subtle" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map</h3>
                <p className="text-muted-foreground mb-1">Showing {mapFilter} issues in the area</p>
                <p className="text-sm text-muted-foreground">
                  {allIssues.filter(i => i.category === mapFilter.slice(0, -1)).length} active issues
                </p>
              </div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-destructive rounded-full animate-pulse" />
              <div className="absolute bottom-6 left-8 w-2 h-2 bg-warning rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <CardHeader>
            <CardTitle className="font-display text-xl">Recent Issues</CardTitle>
            <CardDescription>
              {filteredIssues.length} of {allIssues.length} issues
              {searchQuery && ` matching "${searchQuery}"`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredIssues.length === 0 ? (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No issues found matching your criteria</p>
              </div>
            ) : (
              filteredIssues.map((issue, index) => (
                <div 
                  key={issue.id} 
                  className="border border-border rounded-xl p-5 space-y-3 hover:shadow-md transition-all duration-200 animate-fade-up group"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                      {issue.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(issue.priority)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleIssueAction("View details", issue.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleIssueAction("Add comment", issue.id)}>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Add Comment
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleIssueAction("Support", issue.id)}>
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Support Issue
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {issue.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{issue.location}</span>
                    </div>
                    {getStatusBadge(issue.status)}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {issue.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {issue.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {issue.likes}
                      </span>
                    </div>
                    <span className="text-muted-foreground">{issue.time}</span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}