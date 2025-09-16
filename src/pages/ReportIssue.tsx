import { useState } from "react"
import { ArrowLeft, Camera, Mic, MapPin, Send } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function ReportIssue() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast({
      title: "Issue reported successfully!",
      description: "Your report has been submitted and will be reviewed by the relevant department.",
    })
    
    setIsSubmitting(false)
    navigate("/")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/")}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Report Civic Issue</h1>
          <p className="text-muted-foreground">Help improve your community by reporting issues</p>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Issue Details</CardTitle>
          <CardDescription>Provide detailed information about the issue you want to report</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Issue Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Large Pothole on Elm Street"
                required
                className="bg-background"
              />
            </div>

            {/* Detailed Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide more details about the issue..."
                rows={4}
                required
                className="bg-background resize-none"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <div className="flex gap-2">
                <Select required>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="potholes">Potholes</SelectItem>
                    <SelectItem value="streetlights">Street Lights</SelectItem>
                    <SelectItem value="drainage">Drainage Issues</SelectItem>
                    <SelectItem value="garbage">Garbage Collection</SelectItem>
                    <SelectItem value="noise">Noise Pollution</SelectItem>
                    <SelectItem value="water">Water Issues</SelectItem>
                    <SelectItem value="traffic">Traffic Problems</SelectItem>
                    <SelectItem value="parks">Parks & Recreation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" type="button" className="bg-background hover:bg-accent">
                  Auto-Classify
                </Button>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Enter address or description"
                  className="bg-background"
                />
                <Button variant="outline" type="button" className="bg-background hover:bg-accent">
                  <MapPin className="w-4 h-4 mr-2" />
                  Use GPS
                </Button>
              </div>
            </div>

            {/* Attachments */}
            <div className="space-y-4">
              <Label>Attachments (Optional)</Label>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                    <h3 className="font-medium text-sm">Upload Photos</h3>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Mic className="w-8 h-8 text-muted-foreground mb-2" />
                    <h3 className="font-medium text-sm">Upload Voice Note</h3>
                    <p className="text-xs text-muted-foreground">MP3, WAV up to 5MB</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Issue Report
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}