import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminLogin() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = () => {
    console.log("🚨 DEBUG START - Button clicked!");
    console.log("Current URL:", window.location.href);
    
    setIsLoading(true);
    setError("");
    
    console.log("🔑 Attempting login:", username, password);
    console.log("Login function exists:", !!login);

    // Check if useAuth is working
    const testUser = localStorage.getItem("auth_user");
    console.log("Current localStorage before login:", testUser);

    // Simple login test
    const success = login(username, password);
    console.log("LOGIN RESULT:", success);
    console.log("localStorage after login:", localStorage.getItem("auth_user"));

    if (success) {
      console.log("✅ LOGIN SUCCESS - Trying redirect");
      
      // TEST REDIRECT - Multiple methods
      console.log("Method 1: window.location.href");
      window.location.href = "/admin";
      
      console.log("Method 2: window.location.assign (should run next)");
      setTimeout(() => {
        console.log("Running method 2");
        window.location.assign("/admin");
      }, 100);
      
      console.log("Method 3: window.location.replace (should run next)");
      setTimeout(() => {
        console.log("Running method 3");
        window.location.replace("/admin");
      }, 200);
      
    } else {
      console.log("❌ LOGIN FAILED");
      setError("Login failed. Check console for details.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Admin Login - DEBUG MODE</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <Button 
            onClick={handleLoginClick}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Logging in..." : "DEBUG LOGIN"}
          </Button>
          <div style={{ fontSize: "12px", color: "gray" }}>
            Check console (F12) for debug logs
          </div>
        </CardContent>
      </Card>
    </div>
  );
}