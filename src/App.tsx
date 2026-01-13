import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SafetyPage from "./pages/SafetyPage";
import HealthPage from "./pages/HealthPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AdminSignUp from "./pages/admin/AdminSignUp";
import AdminSignIn from "./pages/admin/AdminSignIn";
import ForgotPassword from "./pages/admin/ForgotPassword";
import ResetPassword from "./pages/admin/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import AIAnalyticsPage from "./pages/admin/AIAnalyticsPage";
import MessagesPage from "./pages/admin/MessagesPage";
import { AdminLayout } from "./components/admin/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Admin Auth Routes */}
            <Route path="/admin/signup" element={<AdminSignUp />} />
            <Route path="/admin/signin" element={<AdminSignIn />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="ai-analytics" element={<AIAnalyticsPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="reports" element={<AdminDashboard />} />
              <Route path="notifications" element={<MessagesPage />} />
              <Route path="settings" element={<AdminDashboard />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
