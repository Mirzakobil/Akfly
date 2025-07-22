import React, { useState } from 'react';
import { SearchIcon, FilterIcon, DownloadIcon } from 'lucide-react';
interface Flight {
  id: number;
  aircraft: string;
  date: string;
  departureCity: string;
  arrivalCity: string;
  takeoffTime: string;
  landingTime: string;
  duration: string;
  passengers: number;
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
const FlightDataViewPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterAircraft, setFilterAircraft] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Flight;
    direction: 'ascending' | 'descending';
  } | null>(null);
  // Sample data
  const flightData: Flight[] = [{
    id: 1,
    aircraft: 'N12345',
    date: '2023-05-15',
    departureCity: 'New York',
    arrivalCity: 'Los Angeles',
    takeoffTime: '08:00',
    landingTime: '11:30',
    duration: '3.5',
    passengers: 4
  }, {
    id: 2,
    aircraft: 'N67890',
    date: '2023-05-20',
    departureCity: 'Chicago',
    arrivalCity: 'Dallas',
    takeoffTime: '10:15',
    landingTime: '12:30',
    duration: '2.25',
    passengers: 3
  }, {
    id: 3,
    aircraft: 'N54321',
    date: '2023-05-25',
    departureCity: 'Houston',
    arrivalCity: 'Phoenix',
    takeoffTime: '14:00',
    landingTime: '15:45',
    duration: '1.75',
    passengers: 2
  }, {
    id: 4,
    aircraft: 'N12345',
    date: '2023-06-01',
    departureCity: 'Los Angeles',
    arrivalCity: 'New York',
    takeoffTime: '07:30',
    landingTime: '15:45',
    duration: '5.25',
    passengers: 5
  }, {
    id: 5,
    aircraft: 'N98765',
    date: '2023-06-05',
    departureCity: 'Dallas',
    arrivalCity: 'Chicago',
    takeoffTime: '16:00',
    landingTime: '18:15',
    duration: '2.25',
    passengers: 3
  }];
  const cities = [...new Set([...flightData.map(flight => flight.departureCity), ...flightData.map(flight => flight.arrivalCity)])].sort();
  // Get aircraft name from ID for display
  const getAircraftName = (id: string) => {
    const aircraft = aircraftData.find(a => a.id === id);
    return aircraft ? `${id} (${aircraft.model})` : id;
  };
  const handleSort = (key: keyof Flight) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({
      key,
      direction
    });
  };
  const sortedFlights = [...flightData].sort((a, b) => {
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
  const filteredFlights = sortedFlights.filter(flight => {
    const matchesSearch = flight.departureCity.toLowerCase().includes(searchTerm.toLowerCase()) || flight.arrivalCity.toLowerCase().includes(searchTerm.toLowerCase()) || flight.date.includes(searchTerm) || flight.aircraft.includes(searchTerm);
    const matchesCity = filterCity === '' || flight.departureCity === filterCity || flight.arrivalCity === filterCity;
    const matchesAircraft = filterAircraft === '' || flight.aircraft === filterAircraft;
    return matchesSearch && matchesCity && matchesAircraft;
  });
  const exportToExcel = () => {
    // In a real app, this would generate and download an Excel file
    alert('Exporting to Excel...');
  };
  return <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        Flight Data
      </h1>
      <div className="bg-white rounded-lg shadow mb-4 md:mb-6">
        <div className="p-4 flex flex-col gap-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} className="text-gray-400" />
              </div>
              <input type="text" placeholder="Search flights..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <button onClick={exportToExcel} className="w-full md:w-auto px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
              <DownloadIcon size={16} className="mr-2" />
              Export to Excel
            </button>
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
              <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Cities</option>
                {cities.map(city => <option key={city} value={city}>
                    {city}
                  </option>)}
              </select>
            </div>
          </div>
        </div>
        {/* Mobile card view for small screens */}
        <div className="md:hidden">
          {filteredFlights.length > 0 ? <div className="divide-y divide-gray-200">
              {filteredFlights.map(flight => <div key={flight.id} className="p-4">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium text-blue-600">
                      {getAircraftName(flight.aircraft)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {flight.date}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="text-sm font-medium">
                        {flight.departureCity}
                      </div>
                      <div className="text-xs text-gray-500">
                        {flight.takeoffTime}
                      </div>
                    </div>
                    <div className="text-gray-400">→</div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {flight.arrivalCity}
                      </div>
                      <div className="text-xs text-gray-500">
                        {flight.landingTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <div>Duration: {flight.duration}h</div>
                    <div>Passengers: {flight.passengers}</div>
                  </div>
                </div>)}
            </div> : <div className="p-4 text-center text-sm text-gray-500">
              No flights found matching your search criteria.
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('departureCity')}>
                  From
                  {sortConfig?.key === 'departureCity' && <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('arrivalCity')}>
                  To
                  {sortConfig?.key === 'arrivalCity' && <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('takeoffTime')}>
                  Take-off
                  {sortConfig?.key === 'takeoffTime' && <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('landingTime')}>
                  Landing
                  {sortConfig?.key === 'landingTime' && <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('duration')}>
                  Duration (h)
                  {sortConfig?.key === 'duration' && <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('passengers')}>
                  Passengers
                  {sortConfig?.key === 'passengers' && <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFlights.length > 0 ? filteredFlights.map(flight => <tr key={flight.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {getAircraftName(flight.aircraft)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flight.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flight.departureCity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flight.arrivalCity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flight.takeoffTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flight.landingTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flight.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flight.passengers}
                    </td>
                  </tr>) : <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                    No flights found matching your search criteria.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default FlightDataViewPage;