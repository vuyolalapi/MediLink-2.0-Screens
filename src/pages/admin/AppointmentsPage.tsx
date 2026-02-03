import {AdminSidebar} from "@/components/AdminSidebar";
import {DashboardHeader} from "@/components/DashboardHeader";
import AppointmentsManager from "@/features/appointments/AppointmentsManager";
import { useNavigate } from "react-router-dom";


export default function AdminAppointmentsPage() {
  function setSidebarOpen(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }
  const navigate = useNavigate();


   return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar isOpen={false} onClose={function (): void {
         throw new Error("Function not implemented.");
       } } />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
         <DashboardHeader
          userName="Dr. Sarah Johnson"
          role="Doctor"
          department="Cardiology"
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={() => navigate("/")}
        />

        {/* Page content */}
        <main className="p-4 flex-1 overflow-auto">
          <AppointmentsManager role="ADMIN" />
        </main>
      </div>
    </div>
  );
}
