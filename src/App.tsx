import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  
  console.log("🔍 Auth check:", user);
  
  if (user && user.role === "admin") {
    return children;
  }
  
  return <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1 style={{ color: "blue", marginBottom: "30px" }}>FINAL AUTH TEST</h1>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } 
          />
          <Route path="/" element={<div style={{ color: "green", fontSize: "24px" }}>HOME PAGE</div>} />
          <Route path="*" element={<div style={{ color: "red", fontSize: "24px" }}>404</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;