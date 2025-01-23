import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreateProfile from "./pages/profile/CreateProfile";
import EditProfile from "./pages/profile/EditProfile";
import ViewProfile from "./pages/profile/ViewProfile";
import CreateAnnouncement from "./pages/announcements/CreateAnnouncement";
import EditAnnouncement from "./pages/announcements/EditAnnouncement";
import ViewAnnouncement from "./pages/announcements/ViewAnnouncement";
import Applications from "./pages/applications/Applications";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CompanyDashboard from "./pages/dashboard/CompanyDashboard";
import CandidateDashboard from "./pages/dashboard/CandidateDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/create" element={<CreateProfile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/:id" element={<ViewProfile />} />
          <Route path="/announcements/create" element={<CreateAnnouncement />} />
          <Route path="/announcements/edit/:id" element={<EditAnnouncement />} />
          <Route path="/announcements/:id" element={<ViewAnnouncement />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;