import React, { useState } from 'react';
import { SearchIcon, FilterIcon, DownloadIcon, CalendarIcon } from 'lucide-react';
interface Expense {
  id: number;
  aircraft: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  flight: string | null;
}
// Sample aircraft data
const aircraftData = [{
  id: 'N12345',
  model: 'Cessna 172',
  year: '2018'
}, {
  id: 'N67890',
  model: 'Piper PA-28',
  year: '2019'
}, {
  id: 'N54321',
  model: 'Cirrus SR22',
  year: '2020'
}, {
  id: 'N98765',
  model: 'Beechcraft Bonanza',
  year: '2017'
}];
const ExpensesDataViewPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterAircraft, setFilterAircraft] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Expense;
    direction: 'ascending' | 'descending';
  } | null>(null);
  // Sample data
  const expensesData: Expense[] = [{
    id: 1,
    aircraft: 'N12345',
    date: '2023-05-10',
    category: 'Fuel',
    description: 'Jet-A fuel refill',
    amount: 2500.0,
    flight: 'NY to LA - 05/15/2023'
  }, {
    id: 2,
    aircraft: 'N67890',
    date: '2023-05-12',
    category: 'Maintenance',
    description: 'Routine engine inspection',
    amount: 1200.0,
    flight: null
  }, {
    id: 3,
    aircraft: 'N12345',
    date: '2023-05-15',
    category: 'Landing Fees',
    description: 'LAX landing fee',
    amount: 350.0,
    flight: 'NY to LA - 05/15/2023'
  }, {
    id: 4,
    aircraft: 'N67890',
    date: '2023-05-18',
    category: 'Catering',
    description: 'In-flight meals',
    amount: 450.0,
    flight: 'Chicago to Dallas - 05/20/2023'
  }, {
    id: 5,
    aircraft: 'N54321',
    date: '2023-05-20',
    category: 'Fuel',
    description: 'Jet-A fuel refill',
    amount: 1800.0,
    flight: 'Chicago to Dallas - 05/20/2023'
  }, {
    id: 6,
    aircraft: 'N98765',
    date: '2023-05-22',
    category: 'Crew Expenses',
    description: 'Hotel accommodations',
    amount: 750.0,
    flight: null
  }, {
    id: 7,
    aircraft: 'N54321',
    date: '2023-05-25',
    category: 'Hangar Rent',
    description: 'Monthly hangar fee',
    amount: 3000.0,
    flight: null
  }];
  const categories = [...new Set(expensesData.map(expense => expense.category))].sort();
  // Get aircraft name from ID for display
  const getAircraftName = (id: string) => {
    const aircraft = aircraftData.find(a => a.id === id);
    return aircraft ? `${id} (${aircraft.model})` : id;
  };
  const handleSort = (key: keyof Expense) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({
      key,
      direction
    });
  };
  const sortedExpenses = [...expensesData].sort((a, b) => {
    if (!sortConfig) return 0;
    const {
      key,
      direction
    } = sortConfig;
    if (a[key] < b[key]) {
      return direction === 'ascending' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  const filteredExpenses = sortedExpenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) || expense.category.toLowerCase().includes(searchTerm.toLowerCase()) || expense.aircraft.includes(searchTerm) || expense.flight && expense.flight.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || expense.category === filterCategory;
    const matchesAircraft = filterAircraft === '' || expense.aircraft === filterAircraft;
    const matchesDateRange = (dateRange.start === '' || expense.date >= dateRange.start) && (dateRange.end === '' || expense.date <= dateRange.end);
    return matchesSearch && matchesCategory && matchesAircraft && matchesDateRange;
  });
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const exportToExcel = () => {
    // In a real app, this would generate and download an Excel file
    alert('Exporting to Excel...');
  };
  return <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        Expenses Data
      </h1>
      <div className="bg-white rounded-lg shadow mb-4 md:mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col space-y-4 mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} className="text-gray-400" />
              </div>
              <input type="text" placeholder="Search expenses..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2 w-full sm:w-1/2">
                <FilterIcon size={16} className="text-gray-400 min-w-[16px]" />
                <select value={filterAircraft} onChange={e => setFilterAircraft(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Aircraft</option>
                  {aircraftData.map(aircraft => <option key={aircraft.id} value={aircraft.id}>
                      {aircraft.id} - {aircraft.model}
                    </option>)}
                </select>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-1/2">
                <FilterIcon size={16} className="text-gray-400 min-w-[16px]" />
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Categories</option>
                  {categories.map(category => <option key={category} value={category}>
                      {category}
                    </option>)}
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
              <CalendarIcon size={16} className="text-gray-400 hidden sm:block" />
              <div className="flex items-center w-full">
                <div className="flex sm:hidden items-center mb-1">
                  <CalendarIcon size={16} className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Date Range:</span>
                </div>
                <div className="flex flex-col sm:flex-row w-full gap-2">
                  <input type="date" value={dateRange.start} onChange={e => setDateRange({
                  ...dateRange,
                  start: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Start Date" />
                  <span className="text-gray-500 hidden sm:block">to</span>
                  <input type="date" value={dateRange.end} onChange={e => setDateRange({
                  ...dateRange,
                  end: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="End Date" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-700 w-full sm:w-auto text-center sm:text-left">
              <span className="font-medium">Total: </span>
              <span className="text-lg font-bold">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <button onClick={exportToExcel} className="w-full sm:w-auto px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
              <DownloadIcon size={16} className="mr-2" />
              Export to Excel
            </button>
          </div>
        </div>
        {/* Mobile card view for expenses */}
        <div className="md:hidden">
          {filteredExpenses.length > 0 ? <div className="divide-y divide-gray-200">
              {filteredExpenses.map(expense => <div key={expense.id} className="p-4">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium text-blue-600">
                      {getAircraftName(expense.aircraft)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {expense.date}
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium text-gray-900">
                      {expense.category}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${expense.amount.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">
                    {expense.description}
                  </div>
                  {expense.flight && <div className="text-xs text-gray-500">
                      Flight: {expense.flight}
                    </div>}
                </div>)}
            </div> : <div className="p-4 text-center text-sm text-gray-500">
              No expenses found matching your search criteria.
            </div>}
        </div>
        {/* Desktop table view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('aircraft')}>
                  Aircraft
                  {sortConfig?.key === 'aircraft' && <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                  Date
                  {sortConfig?.key === 'date' && <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('category')}>
                  Category
                  {sortConfig?.key === 'category' && <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('description')}>
                  Description
                  {sortConfig?.key === 'description' && <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('amount')}>
                  Amount
                  {sortConfig?.key === 'amount' && <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Associated Flight
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.length > 0 ? filteredExpenses.map(expense => <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {getAircraftName(expense.aircraft)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${expense.category === 'Fuel' ? 'bg-blue-100 text-blue-800' : expense.category === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' : expense.category === 'Landing Fees' ? 'bg-green-100 text-green-800' : expense.category === 'Hangar Rent' ? 'bg-purple-100 text-purple-800' : expense.category === 'Crew Expenses' ? 'bg-indigo-100 text-indigo-800' : expense.category === 'Catering' ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-800'}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      ${expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.flight || '-'}
                    </td>
                  </tr>) : <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No expenses found matching your search criteria.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default ExpensesDataViewPage;