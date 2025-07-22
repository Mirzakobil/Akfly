import React from 'react';
import { Link } from 'react-router-dom';
import { PlaneTakeoffIcon, DollarSignIcon, ClipboardListIcon, BarChart2Icon } from 'lucide-react';
const DashboardPage = () => {
  return <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <DashboardCard title="Enter Flight Data" description="Record new flight information" icon={<PlaneTakeoffIcon size={24} />} linkTo="/flight-entry" color="bg-blue-500" />
        <DashboardCard title="Enter Expenses" description="Record aircraft expenses" icon={<DollarSignIcon size={24} />} linkTo="/expense-entry" color="bg-green-500" />
        <DashboardCard title="View Flights" description="Access flight records" icon={<ClipboardListIcon size={24} />} linkTo="/flights" color="bg-purple-500" />
        <DashboardCard title="View Expenses" description="Review expense data" icon={<BarChart2Icon size={24} />} linkTo="/expenses" color="bg-orange-500" />
      </div>
      <div className="mt-6 md:mt-10">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white shadow rounded-lg p-4 md:p-6">
          <p className="text-gray-500">No recent activity to display.</p>
        </div>
      </div>
    </div>;
};
interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  color: string;
}
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  linkTo,
  color
}) => {
  return <Link to={linkTo} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 md:p-6">
        <div className={`inline-flex p-3 rounded-full ${color} text-white mb-3 md:mb-4`}>
          {icon}
        </div>
        <h3 className="text-base md:text-lg font-semibold text-gray-800">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-600 mt-1">{description}</p>
      </div>
    </Link>;
};
export default DashboardPage;