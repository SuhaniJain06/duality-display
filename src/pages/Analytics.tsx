import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Users } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Chart imports will be added when needed

const categoryData = [
  { name: "Potholes", value: 14.3, color: "#8b5cf6" },
  { name: "Garbage", value: 9.5, color: "#ef4444" },
  { name: "Street Lights", value: 9.5, color: "#f59e0b" },
  { name: "Park Maintenance", value: 19.0, color: "#10b981" },
  { name: "Open Drain", value: 4.8, color: "#3b82f6" },
  { name: "Noise Pollution", value: 9.5, color: "#f97316" },
  { name: "Water Leak", value: 9.5, color: "#06b6d4" },
  { name: "Traffic Signal", value: 9.5, color: "#84cc16" },
  { name: "Illegal Dumping", value: 9.5, color: "#a855f7" },
  { name: "Animals", value: 4.8, color: "#f59e0b" },
]

const statusData = [
  { name: "Reported", value: 4, color: "#64748b" },
  { name: "Acknowledged", value: 3, color: "#3b82f6" },
  { name: "In Progress", value: 2, color: "#f59e0b" },
  { name: "Resolved", value: 6, color: "#10b981" },
  { name: "Closed", value: 3, color: "#6b7280" },
]

const departmentData = [
  { department: "Public Works", total: 5, resolved: 1, rate: 20.0, rating: 1.0 },
  { department: "Parks Recreation", total: 2, resolved: 0, rate: 0.0, rating: null },
  { department: "Electrical", total: 2, resolved: 0, rate: 0.0, rating: null },
  { department: "Sanitation", total: 4, resolved: 0, rate: 0.0, rating: null },
  { department: "Police", total: 2, resolved: 1, rate: 50.0, rating: 5.0 },
  { department: "Transportation", total: 2, resolved: 2, rate: 100.0, rating: 4.0 },
  { department: "Water Board", total: 1, resolved: 0, rate: 0.0, rating: null },
  { department: "Utilities", total: 2, resolved: 0, rate: 0.0, rating: null },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Insights and performance metrics for civic issues</p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-40 bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="year">This year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Issues"
          value="21"
          icon={AlertTriangle}
          variant="info"
        />
        <MetricCard
          title="Resolution Rate"
          value="19.0%"
          icon={TrendingUp}
          variant="success"
        />
        <MetricCard
          title="Avg Rating"
          value="3.5"
          icon={CheckCircle}
          variant="warning"
        />
        <MetricCard
          title="Active Citizens"
          value="1,247"
          icon={Users}
          variant="info"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Issues by Category */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
            <CardDescription>Distribution of reported issues by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 grid grid-cols-2 gap-4 p-4">
              {categoryData.slice(0, 8).map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-lg font-bold" style={{ color: item.color }}>
                      {item.value}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Issues by Status */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Issues by Status</CardTitle>
            <CardDescription>Current status distribution of all issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 space-y-4 p-4">
              {statusData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm font-bold">{item.value}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(item.value / Math.max(...statusData.map(d => d.value))) * 100}%`,
                        backgroundColor: item.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Performance metrics by government department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total Issues</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Resolved</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Resolution Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Avg Rating</th>
                </tr>
              </thead>
              <tbody>
                {departmentData.map((dept, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 font-medium">{dept.department}</td>
                    <td className="py-3 px-4">{dept.total}</td>
                    <td className="py-3 px-4">{dept.resolved}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${
                        dept.rate === 100 ? "text-success" :
                        dept.rate >= 50 ? "text-warning" :
                        dept.rate > 0 ? "text-info" :
                        "text-destructive"
                      }`}>
                        {dept.rate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {dept.rating ? (
                        <span className="font-medium">{dept.rating.toFixed(1)}</span>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}