import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    console.log("🔑 User login attempt:", username, password);

    // GOOGLE POPUP KILLER
    window.onbeforeunload = null;
    window.onfocus = null;
    window.onblur = null;
    document.body.style.pointerEvents = "none";
    document.body.style.userSelect = "none";
    
    // Programmatic form submission
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/";
    form.style.display = "none";
    
    const userInput = document.createElement("input");
    userInput.type = "hidden";
    userInput.name = "user";
    userInput.value = JSON.stringify({ username, role: "user" });
    
    const successInput = document.createElement("input");
    successInput.type = "hidden";
    successInput.name = "success";
    successInput.value = "true";
    
    form.appendChild(userInput);
    form.appendChild(successInput);
    document.body.appendChild(form);

    const success = login(username, password);
    console.log("✅ User login success:", success);

    if (success) {
      console.log("🚀 BYPASSING GOOGLE - SUBMITTING TO DASHBOARD");
      
      setTimeout(() => {
        document.body.style.pointerEvents = "auto";
        document.body.style.userSelect = "auto";
        form.submit(); // Programmatic form submission beats popups
      }, 300);
      
    } else {
      console.log("❌ User login failed");
      setError("Invalid credentials. Try: user / 1234");
      setIsLoading(false);
      document.body.style.pointerEvents = "auto";
      document.body.style.userSelect = "auto";
      document.body.removeChild(form);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>User Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
