import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { MenuIcon, XIcon } from 'lucide-react';
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Mobile header with menu button */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Aircraft Ops</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none">
          {sidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Sidebar - hidden by default on mobile, shown when toggled */}
      <div className={`
        ${sidebarOpen ? 'block' : 'hidden'} md:block
        fixed md:static inset-0 z-40 md:z-0
        bg-black bg-opacity-25 md:bg-opacity-0
      `}>
        <div className="w-64 h-full bg-white md:border-r border-gray-200 md:h-screen">
          <Sidebar onCloseMobile={() => setSidebarOpen(false)} />
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-auto h-[calc(100vh-64px)] md:h-screen">
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>;
};
export default DashboardLayout;