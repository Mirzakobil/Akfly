import React, { useState } from 'react';
import { SaveIcon, XIcon } from 'lucide-react';
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
const FlightDataEntryPage = () => {
  const [formData, setFormData] = useState({
    aircraft: '',
    date: '',
    takeoffTime: '',
    landingTime: '',
    departureCity: '',
    arrivalCity: '',
    passengers: '',
    duration: '',
    notes: ''
  });
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
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
    // In a real app, we would save the data here
    alert('Flight data submitted successfully!');
    // Reset form
    setFormData({
      aircraft: '',
      date: '',
      takeoffTime: '',
      landingTime: '',
      departureCity: '',
      arrivalCity: '',
      passengers: '',
      duration: '',
      notes: ''
    });
  };
  const handleCancel = () => {
    // Reset form
    setFormData({
      aircraft: '',
      date: '',
      takeoffTime: '',
      landingTime: '',
      departureCity: '',
      arrivalCity: '',
      passengers: '',
      duration: '',
      notes: ''
    });
  };
  return <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        Flight Data Entry
      </h1>
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
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
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Flight Date
              </label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Flight Duration (hours)
              </label>
              <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 2.5" step="0.1" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="takeoffTime" className="block text-sm font-medium text-gray-700 mb-1">
                Take-off Time
              </label>
              <input type="time" id="takeoffTime" name="takeoffTime" value={formData.takeoffTime} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="landingTime" className="block text-sm font-medium text-gray-700 mb-1">
                Landing Time
              </label>
              <input type="time" id="landingTime" name="landingTime" value={formData.landingTime} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="departureCity" className="block text-sm font-medium text-gray-700 mb-1">
                Departure City
              </label>
              <select id="departureCity" name="departureCity" value={formData.departureCity} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="">Select city</option>
                {cities.map(city => <option key={`dep-${city}`} value={city}>
                    {city}
                  </option>)}
              </select>
            </div>
            <div>
              <label htmlFor="arrivalCity" className="block text-sm font-medium text-gray-700 mb-1">
                Arrival City
              </label>
              <select id="arrivalCity" name="arrivalCity" value={formData.arrivalCity} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="">Select city</option>
                {cities.map(city => <option key={`arr-${city}`} value={city}>
                    {city}
                  </option>)}
              </select>
            </div>
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Passengers
              </label>
              <input type="number" id="passengers" name="passengers" value={formData.passengers} onChange={handleChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
            <button type="button" onClick={handleCancel} className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center">
              <XIcon size={16} className="mr-2" />
              Cancel
            </button>
            <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center">
              <SaveIcon size={16} className="mr-2" />
              Submit Flight Data
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default FlightDataEntryPage;