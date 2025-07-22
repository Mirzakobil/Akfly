import React, { useState } from 'react';
import { SaveIcon, XIcon, TrashIcon } from 'lucide-react';
interface Expense {
  id: number;
  aircraft: string;
  category: string;
  description: string;
  date: string;
  amount: string;
  flight: string;
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
const AircraftExpensesEntryPage = () => {
  const [formData, setFormData] = useState({
    aircraft: '',
    category: '',
    description: '',
    date: '',
    amount: '',
    flight: ''
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const expenseCategories = ['Fuel', 'Maintenance', 'Landing Fees', 'Hangar Rent', 'Insurance', 'Crew Expenses', 'Catering', 'Other'];
  const flights = [{
    id: '1',
    name: 'NY to LA - 05/15/2023'
  }, {
    id: '2',
    name: 'Chicago to Dallas - 05/20/2023'
  }, {
    id: '3',
    name: 'Houston to Phoenix - 05/25/2023'
  }];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add expense to list
    const newExpense: Expense = {
      id: Date.now(),
      ...formData
    };
    setExpenses([...expenses, newExpense]);
    // Reset form
    setFormData({
      aircraft: formData.aircraft,
      category: '',
      description: '',
      date: '',
      amount: '',
      flight: ''
    });
  };
  const handleDelete = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };
  // Get aircraft name from ID for display
  const getAircraftName = (id: string) => {
    const aircraft = aircraftData.find(a => a.id === id);
    return aircraft ? `${aircraft.id} - ${aircraft.model}` : id;
  };
  return <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        Aircraft Expenses Entry
      </h1>
      <div className="bg-white rounded-lg shadow p-4 md:p-6 mb-4 md:mb-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="aircraft" className="block text-sm font-medium text-gray-700 mb-1">
              Select Aircraft
            </label>
            <select id="aircraft" name="aircraft" value={formData.aircraft} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
              <option value="">Select aircraft</option>
              {aircraftData.map(aircraft => <option key={aircraft.id} value={aircraft.id}>
                  {aircraft.id} - {aircraft.model} ({aircraft.year})
                </option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Expense Category
              </label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="">Select category</option>
                {expenseCategories.map(category => <option key={category} value={category}>
                    {category}
                  </option>)}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount ($)
              </label>
              <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} step="0.01" min="0" placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="flight" className="block text-sm font-medium text-gray-700 mb-1">
                Associated Flight (Optional)
              </label>
              <select id="flight" name="flight" value={formData.flight} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">None</option>
                {flights.map(flight => <option key={flight.id} value={flight.name}>
                    {flight.name}
                  </option>)}
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
            <button type="button" onClick={() => setFormData({
            aircraft: formData.aircraft,
            category: '',
            description: '',
            date: '',
            amount: '',
            flight: ''
          })} className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center">
              <XIcon size={16} className="mr-2" />
              Clear
            </button>
            <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center">
              <SaveIcon size={16} className="mr-2" />
              Add Expense
            </button>
          </div>
        </form>
      </div>
      {expenses.length > 0 && <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 p-4 border-b">
            Recent Expenses
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aircraft
                  </th>
                  <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="hidden sm:table-cell px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="hidden md:table-cell px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flight
                  </th>
                  <th scope="col" className="px-3 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map(expense => <tr key={expense.id}>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {getAircraftName(expense.aircraft)}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.date}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.category}
                    </td>
                    <td className="hidden sm:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.description}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${parseFloat(expense.amount).toFixed(2)}
                    </td>
                    <td className="hidden md:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.flight || '-'}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDelete(expense.id)} className="text-red-600 hover:text-red-900" aria-label="Delete expense">
                        <TrashIcon size={16} />
                      </button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          {/* Mobile view for expenses */}
          <div className="md:hidden">
            {expenses.map(expense => <div key={expense.id} className="p-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-sm">
                    {getAircraftName(expense.aircraft)}
                  </div>
                  <button onClick={() => handleDelete(expense.id)} className="text-red-600 hover:text-red-900" aria-label="Delete expense">
                    <TrashIcon size={16} />
                  </button>
                </div>
                <div className="flex justify-between mb-1">
                  <div className="text-sm">{expense.date}</div>
                  <div className="text-sm font-medium">
                    ${parseFloat(expense.amount).toFixed(2)}
                  </div>
                </div>
                <div className="mb-1">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100">
                    {expense.category}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {expense.description}
                </div>
                {expense.flight && <div className="text-xs text-gray-500">
                    Flight: {expense.flight}
                  </div>}
              </div>)}
          </div>
        </div>}
    </div>;
};
export default AircraftExpensesEntryPage;