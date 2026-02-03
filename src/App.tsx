import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import EMTDashboard from "./pages/emt/EMTDashboard";
import NotFound from "./pages/NotFound";
import ITSupport from "./pages/it-support";
import ForgotPassword from "./pages/forgot-password";
import UsageReports from "./pages/admin/ReportsPage";
import MedicalStats from "./pages/admin/ReportsPage";
import EmergencyMetrics from "./pages/admin/ReportsPage";
import DoctorAppointmentsPage from "@/pages/doctor/AppointmentsPage";
import AdminAppointmentsPage from "@/pages/admin/AppointmentsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/doctor/*" element={<DoctorDashboard />} />
          <Route path="/emt/*" element={<EMTDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path = "/it-support*" element = {<ITSupport/>} />
          <Route path = "/forgot-password*" element = {<ForgotPassword/>} />
          <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
          <Route path="/admin/appointments" element={<AdminAppointmentsPage />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
