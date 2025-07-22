import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, PlaneTakeoffIcon, ClipboardListIcon, DollarSignIcon, BarChart2Icon, LogOutIcon, PieChartIcon } from 'lucide-react';
interface SidebarProps {
  onCloseMobile?: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  onCloseMobile
}) => {
  const navItems = [{
    name: 'Dashboard',
    path: '/dashboard',
    icon: <HomeIcon size={20} />
  }, {
    name: 'Flight Entry',
    path: '/flight-entry',
    icon: <PlaneTakeoffIcon size={20} />
  }, {
    name: 'Expense Entry',
    path: '/expense-entry',
    icon: <DollarSignIcon size={20} />
  }, {
    name: 'Flight Data',
    path: '/flights',
    icon: <ClipboardListIcon size={20} />
  }, {
    name: 'Expense Data',
    path: '/expenses',
    icon: <BarChart2Icon size={20} />
  }, {
    name: 'Expense Analytics',
    path: '/expense-analytics',
    icon: <PieChartIcon size={20} />
  }];
  const handleClick = () => {
    // Close mobile sidebar when a link is clicked
    if (onCloseMobile) {
      onCloseMobile();
    }
  };
  return <aside className="h-full flex flex-col">
      <div className="p-6 md:block hidden">
        <h2 className="text-xl font-bold text-gray-800">Aircraft Ops</h2>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {navItems.map(item => <li key={item.path}>
              <NavLink to={item.path} onClick={handleClick} className={({
            isActive
          }) => `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}`}>
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>)}
          <li className="mt-8">
            <NavLink to="/login" onClick={handleClick} className="flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600">
              <span className="mr-3">
                <LogOutIcon size={20} />
              </span>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>;
};
export default Sidebar;