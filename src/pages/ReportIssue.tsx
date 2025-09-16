import { useState } from "react"
import { ArrowLeft, Camera, Mic, MapPin, Send, Upload, AlertCircle, CheckCircle, Sparkles, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export default function ReportIssue() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    priority: "medium"
  })
  const [attachments, setAttachments] = useState<string[]>([])
  const [errors, setErrors] = useState<any>({})

  const validateStep = (currentStep: number) => {
    const newErrors: any = {}
    
    if (currentStep >= 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required"
      if (!formData.description.trim()) newErrors.description = "Description is required"
    }
    
    if (currentStep >= 2) {
      if (!formData.category) newErrors.category = "Category is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(3)) return
    
    setIsSubmitting(true)
    
    // Simulate API call with progress
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast({
      title: "✅ Issue reported successfully!",
      description: "Your report has been submitted and assigned ID #IRS-2024-001. You'll receive updates via notifications.",
    })
    
    setIsSubmitting(false)
    navigate("/")
  }

  const handleFileUpload = (type: 'photo' | 'voice') => {
    const newAttachment = type === 'photo' ? '📷 Photo uploaded' : '🎤 Voice note recorded'
    setAttachments(prev => [...prev, newAttachment])
    toast({
      title: "File uploaded",
      description: `${type === 'photo' ? 'Photo' : 'Voice note'} has been attached to your report.`,
    })
  }

  const getProgressPercentage = () => {
    return Math.min((step / 3) * 100, 100)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/")}
          className="hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-4xl font-display font-bold text-foreground tracking-tight">
            Report Civic Issue
          </h1>
          <p className="text-lg text-muted-foreground">
            Help improve your community by reporting issues
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card className="bg-gradient-card shadow-card animate-fade-up">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-foreground">Progress</h3>
              <Badge variant="outline" className="font-medium">
                Step {step} of 3
              </Badge>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className={step >= 1 ? "text-primary font-medium" : ""}>Issue Details</span>
              <span className={step >= 2 ? "text-primary font-medium" : ""}>Category & Location</span>
              <span className={step >= 3 ? "text-primary font-medium" : ""}>Attachments & Submit</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <CardHeader>
          <CardTitle className="font-display text-2xl flex items-center gap-2">
            {step === 1 && <><AlertCircle className="w-6 h-6 text-primary" /> Issue Details</>}
            {step === 2 && <><MapPin className="w-6 h-6 text-primary" /> Category & Location</>}
            {step === 3 && <><Upload className="w-6 h-6 text-primary" /> Attachments & Submit</>}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Provide detailed information about the issue you want to report"}
            {step === 2 && "Help us categorize and locate your issue for faster resolution"}
            {step === 3 && "Add supporting files and submit your report"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Issue Details */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">
                    Issue Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Large Pothole on Elm Street"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    className={`h-12 text-base bg-background transition-all ${
                      errors.title ? "border-destructive focus:border-destructive" : ""
                    }`}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-medium">
                    Detailed Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Provide more details about the issue..."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    className={`text-base bg-background resize-none transition-all ${
                      errors.description ? "border-destructive focus:border-destructive" : ""
                    }`}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {formData.description.length}/500 characters
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Category & Location */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-medium">
                    Category *
                  </Label>
                  <div className="flex gap-2">
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => updateFormData("category", value)}
                    >
                      <SelectTrigger className={`h-12 bg-background ${
                        errors.category ? "border-destructive" : ""
                      }`}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="potholes">🕳️ Potholes</SelectItem>
                        <SelectItem value="streetlights">💡 Street Lights</SelectItem>
                        <SelectItem value="drainage">🌊 Drainage Issues</SelectItem>
                        <SelectItem value="garbage">🗑️ Garbage Collection</SelectItem>
                        <SelectItem value="noise">🔊 Noise Pollution</SelectItem>
                        <SelectItem value="water">💧 Water Issues</SelectItem>
                        <SelectItem value="traffic">🚦 Traffic Problems</SelectItem>
                        <SelectItem value="parks">🌳 Parks & Recreation</SelectItem>
                        <SelectItem value="other">❓ Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" type="button" className="bg-background hover:bg-accent">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Auto-Classify
                    </Button>
                  </div>
                  {errors.category && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.category}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-base font-medium">
                    Priority Level
                  </Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value) => updateFormData("priority", value)}
                  >
                    <SelectTrigger className="h-12 bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">🟢 Low - Minor inconvenience</SelectItem>
                      <SelectItem value="medium">🟡 Medium - Moderate impact</SelectItem>
                      <SelectItem value="high">🔴 High - Safety concern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-medium">
                    Location
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="Enter address or description"
                      value={formData.location}
                      onChange={(e) => updateFormData("location", e.target.value)}
                      className="h-12 bg-background"
                    />
                    <Button variant="outline" type="button" className="bg-background hover:bg-accent">
                      <MapPin className="w-4 h-4 mr-2" />
                      Use GPS
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Attachments & Submit */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-4">
                  <Label className="text-base font-medium">Attachments (Optional)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Card 
                      className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer group"
                      onClick={() => handleFileUpload('photo')}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                        <Camera className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
                        <h3 className="font-medium text-base mb-1">Upload Photos</h3>
                        <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB each</p>
                      </CardContent>
                    </Card>
                    <Card 
                      className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer group"
                      onClick={() => handleFileUpload('voice')}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                        <Mic className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
                        <h3 className="font-medium text-base mb-1">Record Voice Note</h3>
                        <p className="text-sm text-muted-foreground">MP3, WAV up to 5MB</p>
                      </CardContent>
                    </Card>
                  </div>

                  {attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Attached Files</Label>
                      <div className="space-y-2">
                        {attachments.map((attachment, index) => (
                          <Badge key={index} variant="secondary" className="mr-2">
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Summary */}
                <Card className="bg-muted/50 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      Report Summary
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div><strong>Title:</strong> {formData.title || "Not provided"}</div>
                      <div><strong>Category:</strong> {formData.category || "Not selected"}</div>
                      <div><strong>Priority:</strong> {formData.priority}</div>
                      <div><strong>Location:</strong> {formData.location || "Not provided"}</div>
                      <div><strong>Attachments:</strong> {attachments.length} files</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-border">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
              )}
              
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto flex items-center gap-2 bg-gradient-primary hover:opacity-90"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="ml-auto bg-gradient-primary hover:opacity-90 transition-all px-8"
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
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}