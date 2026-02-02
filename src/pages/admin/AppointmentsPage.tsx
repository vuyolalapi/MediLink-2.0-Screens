import {AdminSidebar} from "@/components/AdminSidebar";
import {DashboardHeader} from "@/components/DashboardHeader";
import AppointmentsManager from "@/features/appointments/AppointmentsManager";


export default function AdminAppointmentsPage() {
   return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar isOpen={false} onClose={function (): void {
         throw new Error("Function not implemented.");
       } } />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader userName={""} role={""} onLogout={function (): void {
           throw new Error("Function not implemented.");
         } }/>

        {/* Page content */}
        <main className="p-4 flex-1 overflow-auto">
          <AppointmentsManager role="ADMIN" />
        </main>
      </div>
    </div>
  );
}
