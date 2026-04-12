import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Toaster } from "sonner";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-6 overflow-y-auto">
          <Outlet />
          <Toaster position="top-right" richColors />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;