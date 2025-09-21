import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Camera, Send, ArrowLeft, AlertCircle, CheckCircle2, Mic } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

// Temporary CivicIssue stub (replace later if backend is ready)
const CivicIssue = {
  create: async (data: any) => {
    console.log("Mock CivicIssue.create called with:", data);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
};

// Temporary page URL helper
const createPageUrl = (page: string) => `/${page}`;

export default function ReportIssue() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: { latitude: 0, longitude: 0, address: "" },
  });
  const [images, setImages] = useState<File[]>([]);
  const [voiceNotes, setVoiceNotes] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // New state to show AI suggestion
  const [aiPrediction, setAiPrediction] = useState<{ prediction: string; confidence: number } | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "image" | "voice") => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);
    if (type === "image") setImages(files);
    if (type === "voice") setVoiceNotes(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // --- ML Check ---
      if (images.length > 0) {
        const formDataImg = new FormData();
        formDataImg.append("file", images[0]); // backend expects "file"

        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          body: formDataImg,
        });

        const result = await response.json();

        console.log("AI predicted:", result.prediction, "with confidence:", result.confidence);

        // Save AI prediction for display
        setAiPrediction({ prediction: result.prediction, confidence: result.confidence });

        // Warn user if category mismatch
        if (formData.category !== result.prediction) {
          setError(
            `⚠️ You selected "${formData.category}", but AI detected "${result.prediction}". Please recheck before submitting.`
          );
          setIsSubmitting(false);
          return;
        }

        // Warn user if confidence is low (< 0.5)
        if (result.confidence < 0.5) {
          setError(
            `⚠️ AI is not confident about this prediction (confidence: ${(
              result.confidence * 100
            ).toFixed(1)}%). Please double-check your image and category.`
          );
          setIsSubmitting(false);
          return;
        }
      }

      // --- Normal Submission ---
      await CivicIssue.create({
        ...formData,
        images,
        voice_notes: voiceNotes,
      });

      setSuccess(true);
      setTimeout(() => navigate(createPageUrl("Dashboard")), 2000);
    } catch (err) {
      console.error(err);
      setError("Error submitting issue. Please try again.");
      setIsSubmitting(false);
    }

    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full text-center shadow-lg">
          <CardContent className="p-8">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Issue Reported Successfully!</h2>
            <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate(createPageUrl("Dashboard"))}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold">Report Civic Issue</h1>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Issue Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label>Issue Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              {/* Description */}
              <div>
                <Label>Detailed Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              {/* Category */}
              <div>
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => handleInputChange("category", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pothole">Pothole</SelectItem>
                    <SelectItem value="garbage">Garbage</SelectItem>
                    <SelectItem value="waterlogging">Waterlogging</SelectItem>
                  </SelectContent>
                </Select>

                {/* AI Prediction Suggestion */}
                {aiPrediction && (
                  <div
                    className={`mt-2 p-2 rounded text-sm ${
                      aiPrediction.confidence >= 0.5 ? "bg-emerald-100 text-emerald-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    AI Suggestion: <strong>{aiPrediction.prediction}</strong> (
                    {Math.round(aiPrediction.confidence * 100)}% confidence)
                  </div>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <Label>Upload Photos</Label>
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "image")} />
              </div>

              {/* Voice Upload */}
              <div>
                <Label>Upload Voice Note</Label>
                <input type="file" accept="audio/*" onChange={(e) => handleFileUpload(e, "voice")} />
              </div>

              {/* Submit */}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Issue Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
