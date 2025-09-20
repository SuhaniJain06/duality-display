import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  console.log("🔍 AdminDashboard - User from context:", user);

  const handleLogout = () => {
    console.log("🚪 Logging out...");
    logout();
    window.location.href = "/admin/login";
  };

  return (
    <div style={{ 
      background: "lightblue", 
      padding: "50px", 
      textAlign: "center", 
      fontSize: "24px",
      minHeight: "100vh"
    }}>
      <h1 style={{ color: "red", fontSize: "36px", marginBottom: "20px" }}>
        🎉 ADMIN DASHBOARD - AUTH WORKING! 🎉
      </h1>
      {user ? (
        <div>
          <p style={{ fontSize: "18px", color: "darkblue", marginBottom: "10px" }}>
            Welcome, <strong>{user.username}</strong>!
          </p>
          <p style={{ fontSize: "16px", color: "purple", marginBottom: "20px" }}>
            Role: <strong>{user.role}</strong>
          </p>
          <Button 
            onClick={handleLogout}
            style={{ 
              background: "red", 
              color: "white", 
              padding: "10px 20px", 
              border: "none", 
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <p style={{ color: "orange", fontSize: "18px" }}>
          No user data - something's wrong with auth!
        </p>
      )}
    </div>
  );
}