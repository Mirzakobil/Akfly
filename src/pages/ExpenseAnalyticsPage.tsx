import React, { useEffect, useState, Fragment } from 'react';
import { DownloadIcon, FilterIcon, CalendarIcon, InfoIcon, PlusIcon } from 'lucide-react';
interface Aircraft {
  id: string;
  model: string;
  year: string;
  registration?: string;
}
interface FlightData {
  id: number;
  aircraft: string;
  date: string;
  blockHours: number;
  flightHours: number;
  departureCity: string;
  arrivalCity: string;
}
interface ExpenseData {
  id: number;
  aircraft: string;
  date: string;
  category: string;
  subcategory: string;
  description: string;
  amount: number;
  flightId?: number;
  isFixed: boolean;
  isOperational: boolean;
}
// Sample aircraft data
const aircraftData: Aircraft[] = [{
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
}, {
  id: 'A7-CGO',
  registration: 'A7-CGO',
  model: 'Bombardier Global 7500',
  year: '2021'
}];
const ExpenseAnalyticsPage = () => {
  // State for filters
  const [dateRange, setDateRange] = useState({
    start: '2023-03-01',
    end: '2023-07-31'
  });
  const [selectedAircraft, setSelectedAircraft] = useState('A7-CGO');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'pivot' | 'detailed'>('detailed');
  // Sample flight data
  const flightData: FlightData[] = [
  // March
  {
    id: 101,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    blockHours: 5.2,
    flightHours: 4.8,
    departureCity: 'Dubai',
    arrivalCity: 'Tashkent'
  }, {
    id: 102,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    blockHours: 6.1,
    flightHours: 5.5,
    departureCity: 'Tashkent',
    arrivalCity: 'Moscow'
  }, {
    id: 103,
    aircraft: 'A7-CGO',
    date: '2023-03-18',
    blockHours: 4.5,
    flightHours: 4.0,
    departureCity: 'Moscow',
    arrivalCity: 'Dubai'
  }, {
    id: 104,
    aircraft: 'A7-CGO',
    date: '2023-03-25',
    blockHours: 5.8,
    flightHours: 5.2,
    departureCity: 'Dubai',
    arrivalCity: 'London'
  }, {
    id: 105,
    aircraft: 'A7-CGO',
    date: '2023-03-30',
    blockHours: 6.2,
    flightHours: 5.6,
    departureCity: 'London',
    arrivalCity: 'Dubai'
  },
  // April
  {
    id: 106,
    aircraft: 'A7-CGO',
    date: '2023-04-05',
    blockHours: 4.8,
    flightHours: 4.2,
    departureCity: 'Dubai',
    arrivalCity: 'Paris'
  }, {
    id: 107,
    aircraft: 'A7-CGO',
    date: '2023-04-10',
    blockHours: 4.9,
    flightHours: 4.3,
    departureCity: 'Paris',
    arrivalCity: 'Dubai'
  }, {
    id: 108,
    aircraft: 'A7-CGO',
    date: '2023-04-15',
    blockHours: 7.2,
    flightHours: 6.5,
    departureCity: 'Dubai',
    arrivalCity: 'Singapore'
  }, {
    id: 109,
    aircraft: 'A7-CGO',
    date: '2023-04-20',
    blockHours: 7.0,
    flightHours: 6.3,
    departureCity: 'Singapore',
    arrivalCity: 'Dubai'
  }, {
    id: 110,
    aircraft: 'A7-CGO',
    date: '2023-04-25',
    blockHours: 5.5,
    flightHours: 4.9,
    departureCity: 'Dubai',
    arrivalCity: 'Tashkent'
  }, {
    id: 111,
    aircraft: 'A7-CGO',
    date: '2023-04-27',
    blockHours: 5.6,
    flightHours: 5.0,
    departureCity: 'Tashkent',
    arrivalCity: 'Dubai'
  },
  // May
  {
    id: 112,
    aircraft: 'A7-CGO',
    date: '2023-05-03',
    blockHours: 6.3,
    flightHours: 5.7,
    departureCity: 'Dubai',
    arrivalCity: 'London'
  }, {
    id: 113,
    aircraft: 'A7-CGO',
    date: '2023-05-08',
    blockHours: 6.4,
    flightHours: 5.8,
    departureCity: 'London',
    arrivalCity: 'New York'
  }, {
    id: 114,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    blockHours: 6.5,
    flightHours: 5.9,
    departureCity: 'New York',
    arrivalCity: 'Los Angeles'
  }, {
    id: 115,
    aircraft: 'A7-CGO',
    date: '2023-05-15',
    blockHours: 5.4,
    flightHours: 4.8,
    departureCity: 'Los Angeles',
    arrivalCity: 'New York'
  }, {
    id: 116,
    aircraft: 'A7-CGO',
    date: '2023-05-20',
    blockHours: 6.6,
    flightHours: 6.0,
    departureCity: 'New York',
    arrivalCity: 'London'
  }, {
    id: 117,
    aircraft: 'A7-CGO',
    date: '2023-05-25',
    blockHours: 6.2,
    flightHours: 5.6,
    departureCity: 'London',
    arrivalCity: 'Dubai'
  }];
  // Sample expense data with more detailed categories
  const expensesData: ExpenseData[] = [
  // Fixed Expenses - March
  {
    id: 1,
    aircraft: 'A7-CGO',
    date: '2023-03-01',
    category: 'Fixed Expenses',
    subcategory: 'Aircraft Lease',
    description: 'Monthly lease payment (ACMI)',
    amount: 770000,
    isFixed: true,
    isOperational: false
  }, {
    id: 2,
    aircraft: 'A7-CGO',
    date: '2023-03-01',
    category: 'Fixed Expenses',
    subcategory: 'Deposit',
    description: 'Security deposit',
    amount: 300000,
    isFixed: true,
    isOperational: false
  },
  // Fixed Expenses - April
  {
    id: 3,
    aircraft: 'A7-CGO',
    date: '2023-04-01',
    category: 'Fixed Expenses',
    subcategory: 'Aircraft Lease',
    description: 'Monthly lease payment (ACMI)',
    amount: 770000,
    isFixed: true,
    isOperational: false
  }, {
    id: 4,
    aircraft: 'A7-CGO',
    date: '2023-04-01',
    category: 'Fixed Expenses',
    subcategory: 'Deposit',
    description: 'Security deposit',
    amount: 105000,
    isFixed: true,
    isOperational: false
  },
  // Fixed Expenses - May
  {
    id: 5,
    aircraft: 'A7-CGO',
    date: '2023-05-01',
    category: 'Fixed Expenses',
    subcategory: 'Aircraft Lease',
    description: 'Monthly lease payment (ACMI)',
    amount: 770000,
    isFixed: true,
    isOperational: false
  }, {
    id: 6,
    aircraft: 'A7-CGO',
    date: '2023-05-01',
    category: 'Fixed Expenses',
    subcategory: 'Deposit',
    description: 'Security deposit',
    amount: 200000,
    isFixed: true,
    isOperational: false
  },
  // Fixed Expenses - June
  {
    id: 7,
    aircraft: 'A7-CGO',
    date: '2023-06-01',
    category: 'Fixed Expenses',
    subcategory: 'Aircraft Lease',
    description: 'Monthly lease payment (ACMI)',
    amount: 770000,
    isFixed: true,
    isOperational: false
  }, {
    id: 8,
    aircraft: 'A7-CGO',
    date: '2023-06-01',
    category: 'Fixed Expenses',
    subcategory: 'Deposit',
    description: 'Security deposit',
    amount: 100000,
    isFixed: true,
    isOperational: false
  },
  // Variable Expenses - March
  {
    id: 9,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    category: 'Variable Expenses',
    subcategory: 'Ground Handling',
    description: 'Handling fees Dubai',
    amount: 15359,
    isFixed: false,
    isOperational: false
  }, {
    id: 10,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    category: 'Variable Expenses',
    subcategory: 'Ground Handling',
    description: 'Handling fees Tashkent',
    amount: 13000,
    isFixed: false,
    isOperational: false
  }, {
    id: 11,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    category: 'Variable Expenses',
    subcategory: 'Fuel',
    description: 'Jet-A1 fuel Dubai',
    amount: 35000,
    isFixed: false,
    isOperational: false
  }, {
    id: 12,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    category: 'Variable Expenses',
    subcategory: 'Fuel',
    description: 'Jet-A1 fuel Tashkent',
    amount: 36358,
    isFixed: false,
    isOperational: false
  }, {
    id: 13,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    category: 'Variable Expenses',
    subcategory: 'Navigation',
    description: 'Overflight permits',
    amount: 3643,
    isFixed: false,
    isOperational: false
  }, {
    id: 14,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    category: 'Variable Expenses',
    subcategory: 'Navigation',
    description: 'Landing permits',
    amount: 3000,
    isFixed: false,
    isOperational: false
  }, {
    id: 15,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    category: 'Variable Expenses',
    subcategory: 'Catering',
    description: 'In-flight meals Dubai',
    amount: 2284,
    isFixed: false,
    isOperational: false
  }, {
    id: 16,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    category: 'Variable Expenses',
    subcategory: 'Catering',
    description: 'In-flight meals Tashkent',
    amount: 2000,
    isFixed: false,
    isOperational: false
  }, {
    id: 17,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    category: 'Variable Expenses',
    subcategory: 'Per Diems',
    description: 'Crew per diems',
    amount: 6720,
    isFixed: false,
    isOperational: false
  }, {
    id: 18,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    category: 'Variable Expenses',
    subcategory: 'Per Diems',
    description: 'Crew per diems',
    amount: 6000,
    isFixed: false,
    isOperational: false
  }, {
    id: 19,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    category: 'Variable Expenses',
    subcategory: 'Crew Travel',
    description: 'Crew positioning',
    amount: 6780,
    isFixed: false,
    isOperational: false
  }, {
    id: 20,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    category: 'Variable Expenses',
    subcategory: 'Crew Travel',
    description: 'Crew accommodation',
    amount: 6000,
    isFixed: false,
    isOperational: false
  }, {
    id: 21,
    aircraft: 'A7-CGO',
    date: '2023-03-31',
    category: 'Variable Expenses',
    subcategory: 'Credit Notes',
    description: 'Refund for overpayment',
    amount: -1957,
    isFixed: false,
    isOperational: false
  },
  // Variable Expenses - April
  {
    id: 22,
    aircraft: 'A7-CGO',
    date: '2023-04-05',
    category: 'Variable Expenses',
    subcategory: 'Ground Handling',
    description: 'Handling fees Dubai',
    amount: 16000,
    isFixed: false,
    isOperational: false
  }, {
    id: 23,
    aircraft: 'A7-CGO',
    date: '2023-04-10',
    category: 'Variable Expenses',
    subcategory: 'Ground Handling',
    description: 'Handling fees Paris',
    amount: 62414,
    isFixed: false,
    isOperational: false
  }, {
    id: 24,
    aircraft: 'A7-CGO',
    date: '2023-04-15',
    category: 'Variable Expenses',
    subcategory: 'Fuel',
    description: 'Jet-A1 fuel Dubai',
    amount: 37000,
    isFixed: false,
    isOperational: false
  }, {
    id: 25,
    aircraft: 'A7-CGO',
    date: '2023-04-20',
    category: 'Variable Expenses',
    subcategory: 'Fuel',
    description: 'Jet-A1 fuel Singapore',
    amount: 41379,
    isFixed: false,
    isOperational: false
  }, {
    id: 26,
    aircraft: 'A7-CGO',
    date: '2023-04-05',
    category: 'Variable Expenses',
    subcategory: 'Navigation',
    description: 'Overflight permits',
    amount: 10915,
    isFixed: false,
    isOperational: false
  }, {
    id: 27,
    aircraft: 'A7-CGO',
    date: '2023-04-15',
    category: 'Variable Expenses',
    subcategory: 'Navigation',
    description: 'Landing permits',
    amount: 13000,
    isFixed: false,
    isOperational: false
  }, {
    id: 28,
    aircraft: 'A7-CGO',
    date: '2023-04-05',
    category: 'Variable Expenses',
    subcategory: 'Catering',
    description: 'In-flight meals Dubai',
    amount: 20661,
    isFixed: false,
    isOperational: false
  }, {
    id: 29,
    aircraft: 'A7-CGO',
    date: '2023-04-20',
    category: 'Variable Expenses',
    subcategory: 'Catering',
    description: 'In-flight meals Singapore',
    amount: 20000,
    isFixed: false,
    isOperational: false
  }, {
    id: 30,
    aircraft: 'A7-CGO',
    date: '2023-04-10',
    category: 'Variable Expenses',
    subcategory: 'Cleaning',
    description: 'Aircraft cleaning Paris',
    amount: 7192,
    isFixed: false,
    isOperational: false
  }, {
    id: 31,
    aircraft: 'A7-CGO',
    date: '2023-04-25',
    category: 'Variable Expenses',
    subcategory: 'Internet',
    description: 'In-flight connectivity',
    amount: 0,
    isFixed: false,
    isOperational: false
  }, {
    id: 32,
    aircraft: 'A7-CGO',
    date: '2023-04-15',
    category: 'Variable Expenses',
    subcategory: 'Charter',
    description: 'Charter fee',
    amount: 36570,
    isFixed: false,
    isOperational: false
  }, {
    id: 33,
    aircraft: 'A7-CGO',
    date: '2023-04-05',
    category: 'Variable Expenses',
    subcategory: 'Per Diems',
    description: 'Crew per diems',
    amount: 7585,
    isFixed: false,
    isOperational: false
  }, {
    id: 34,
    aircraft: 'A7-CGO',
    date: '2023-04-15',
    category: 'Variable Expenses',
    subcategory: 'Per Diems',
    description: 'Crew per diems',
    amount: 7500,
    isFixed: false,
    isOperational: false
  }, {
    id: 35,
    aircraft: 'A7-CGO',
    date: '2023-04-05',
    category: 'Variable Expenses',
    subcategory: 'Crew Travel',
    description: 'Crew positioning',
    amount: 10132,
    isFixed: false,
    isOperational: false
  }, {
    id: 36,
    aircraft: 'A7-CGO',
    date: '2023-04-20',
    category: 'Variable Expenses',
    subcategory: 'Crew Travel',
    description: 'Crew accommodation',
    amount: 10000,
    isFixed: false,
    isOperational: false
  }, {
    id: 37,
    aircraft: 'A7-CGO',
    date: '2023-04-30',
    category: 'Variable Expenses',
    subcategory: 'Credit Notes',
    description: 'Refund for overpayment',
    amount: -6750,
    isFixed: false,
    isOperational: false
  },
  // Variable Expenses - May
  {
    id: 38,
    aircraft: 'A7-CGO',
    date: '2023-05-03',
    category: 'Variable Expenses',
    subcategory: 'Ground Handling',
    description: 'Handling fees Dubai',
    amount: 16837,
    isFixed: false,
    isOperational: false
  }, {
    id: 39,
    aircraft: 'A7-CGO',
    date: '2023-05-08',
    category: 'Variable Expenses',
    subcategory: 'Ground Handling',
    description: 'Handling fees London',
    amount: 48000,
    isFixed: false,
    isOperational: false
  }, {
    id: 40,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    category: 'Variable Expenses',
    subcategory: 'Ground Handling',
    description: 'Handling fees New York',
    amount: 50000,
    isFixed: false,
    isOperational: false
  }, {
    id: 41,
    aircraft: 'A7-CGO',
    date: '2023-05-03',
    category: 'Variable Expenses',
    subcategory: 'Fuel',
    description: 'Jet-A1 fuel Dubai',
    amount: 12015,
    isFixed: false,
    isOperational: false
  }, {
    id: 42,
    aircraft: 'A7-CGO',
    date: '2023-05-08',
    category: 'Variable Expenses',
    subcategory: 'Fuel',
    description: 'Jet-A1 fuel London',
    amount: 15000,
    isFixed: false,
    isOperational: false
  }, {
    id: 43,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    category: 'Variable Expenses',
    subcategory: 'Fuel',
    description: 'Jet-A1 fuel New York',
    amount: 15000,
    isFixed: false,
    isOperational: false
  }, {
    id: 44,
    aircraft: 'A7-CGO',
    date: '2023-05-03',
    category: 'Variable Expenses',
    subcategory: 'Navigation',
    description: 'Overflight permits',
    amount: 5544,
    isFixed: false,
    isOperational: false
  }, {
    id: 45,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    category: 'Variable Expenses',
    subcategory: 'Navigation',
    description: 'Landing permits',
    amount: 10000,
    isFixed: false,
    isOperational: false
  }, {
    id: 46,
    aircraft: 'A7-CGO',
    date: '2023-05-03',
    category: 'Variable Expenses',
    subcategory: 'Catering',
    description: 'In-flight meals Dubai',
    amount: 7831,
    isFixed: false,
    isOperational: false
  }, {
    id: 47,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    category: 'Variable Expenses',
    subcategory: 'Catering',
    description: 'In-flight meals New York',
    amount: 20000,
    isFixed: false,
    isOperational: false
  }, {
    id: 48,
    aircraft: 'A7-CGO',
    date: '2023-05-20',
    category: 'Variable Expenses',
    subcategory: 'Cleaning',
    description: 'Aircraft cleaning London',
    amount: 1659,
    isFixed: false,
    isOperational: false
  }, {
    id: 49,
    aircraft: 'A7-CGO',
    date: '2023-05-15',
    category: 'Variable Expenses',
    subcategory: 'Internet',
    description: 'In-flight connectivity',
    amount: 4215,
    isFixed: false,
    isOperational: false
  }, {
    id: 50,
    aircraft: 'A7-CGO',
    date: '2023-05-03',
    category: 'Variable Expenses',
    subcategory: 'Per Diems',
    description: 'Crew per diems',
    amount: 6600,
    isFixed: false,
    isOperational: false
  }, {
    id: 51,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    category: 'Variable Expenses',
    subcategory: 'Per Diems',
    description: 'Crew per diems',
    amount: 6000,
    isFixed: false,
    isOperational: false
  }, {
    id: 52,
    aircraft: 'A7-CGO',
    date: '2023-05-03',
    category: 'Variable Expenses',
    subcategory: 'Crew Travel',
    description: 'Crew positioning',
    amount: 8513,
    isFixed: false,
    isOperational: false
  }, {
    id: 53,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    category: 'Variable Expenses',
    subcategory: 'Crew Travel',
    description: 'Crew accommodation',
    amount: 8000,
    isFixed: false,
    isOperational: false
  }, {
    id: 54,
    aircraft: 'A7-CGO',
    date: '2023-05-31',
    category: 'Variable Expenses',
    subcategory: 'Credit Notes',
    description: 'Refund for overpayment',
    amount: -10787,
    isFixed: false,
    isOperational: false
  },
  // Operational Expenses - March
  {
    id: 55,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    category: 'Operational Expenses',
    subcategory: 'Crew Accommodation',
    description: 'Hilton Hotel Tashkent',
    amount: 5353,
    isFixed: false,
    isOperational: true
  }, {
    id: 56,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    category: 'Operational Expenses',
    subcategory: 'Crew Accommodation',
    description: 'Hilton Hotel Moscow',
    amount: 4000,
    isFixed: false,
    isOperational: true
  }, {
    id: 57,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    category: 'Operational Expenses',
    subcategory: 'Local Catering',
    description: 'Crew meals Tashkent',
    amount: 1781,
    isFixed: false,
    isOperational: true
  }, {
    id: 58,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    category: 'Operational Expenses',
    subcategory: 'Local Catering',
    description: 'Crew meals Moscow',
    amount: 2000,
    isFixed: false,
    isOperational: true
  }, {
    id: 59,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    category: 'Operational Expenses',
    subcategory: 'Airport Fees',
    description: 'VIP & CIP Hall Tashkent',
    amount: 2822,
    isFixed: false,
    isOperational: true
  }, {
    id: 60,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    category: 'Operational Expenses',
    subcategory: 'Airport Fees',
    description: 'VIP & CIP Hall Moscow',
    amount: 3000,
    isFixed: false,
    isOperational: true
  }, {
    id: 61,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    category: 'Operational Expenses',
    subcategory: 'Crew Transport',
    description: 'Transportation in Tashkent',
    amount: 171,
    isFixed: false,
    isOperational: true
  }, {
    id: 62,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    category: 'Operational Expenses',
    subcategory: 'Crew Transport',
    description: 'Transportation in Moscow',
    amount: 200,
    isFixed: false,
    isOperational: true
  }, {
    id: 63,
    aircraft: 'A7-CGO',
    date: '2023-03-05',
    category: 'Operational Expenses',
    subcategory: 'Miscellaneous',
    description: 'Miscellaneous expenses',
    amount: 227,
    isFixed: false,
    isOperational: true
  }, {
    id: 64,
    aircraft: 'A7-CGO',
    date: '2023-03-12',
    category: 'Operational Expenses',
    subcategory: 'Miscellaneous',
    description: 'Miscellaneous expenses',
    amount: 200,
    isFixed: false,
    isOperational: true
  },
  // Operational Expenses - April
  {
    id: 65,
    aircraft: 'A7-CGO',
    date: '2023-04-05',
    category: 'Operational Expenses',
    subcategory: 'Crew Accommodation',
    description: 'Hilton Hotel Paris',
    amount: 2745,
    isFixed: false,
    isOperational: true
  }, {
    id: 66,
    aircraft: 'A7-CGO',
    date: '2023-04-15',
    category: 'Operational Expenses',
    subcategory: 'Crew Accommodation',
    description: 'Hilton Hotel Singapore',
    amount: 2500,
    isFixed: false,
    isOperational: true
  }, {
    id: 67,
    aircraft: 'A7-CGO',
    date: '2023-04-05',
    category: 'Operational Expenses',
    subcategory: 'Local Catering',
    description: 'Crew meals Paris',
    amount: 3730,
    isFixed: false,
    isOperational: true
  }, {
    id: 68,
    aircraft: 'A7-CGO',
    date: '2023-04-15',
    category: 'Operational Expenses',
    subcategory: 'Local Catering',
    description: 'Crew meals Singapore',
    amount: 3500,
    isFixed: false,
    isOperational: true
  }, {
    id: 69,
    aircraft: 'A7-CGO',
    date: '2023-04-05',
    category: 'Operational Expenses',
    subcategory: 'Airport Fees',
    description: 'VIP & CIP Hall Paris',
    amount: 2549,
    isFixed: false,
    isOperational: true
  }, {
    id: 70,
    aircraft: 'A7-CGO',
    date: '2023-04-15',
    category: 'Operational Expenses',
    subcategory: 'Airport Fees',
    description: 'VIP & CIP Hall Singapore',
    amount: 3000,
    isFixed: false,
    isOperational: true
  }, {
    id: 71,
    aircraft: 'A7-CGO',
    date: '2023-04-05',
    category: 'Operational Expenses',
    subcategory: 'Crew Transport',
    description: 'Transportation in Paris',
    amount: 143,
    isFixed: false,
    isOperational: true
  }, {
    id: 72,
    aircraft: 'A7-CGO',
    date: '2023-04-15',
    category: 'Operational Expenses',
    subcategory: 'Crew Transport',
    description: 'Transportation in Singapore',
    amount: 200,
    isFixed: false,
    isOperational: true
  }, {
    id: 73,
    aircraft: 'A7-CGO',
    date: '2023-04-05',
    category: 'Operational Expenses',
    subcategory: 'Miscellaneous',
    description: 'Miscellaneous expenses',
    amount: 410,
    isFixed: false,
    isOperational: true
  }, {
    id: 74,
    aircraft: 'A7-CGO',
    date: '2023-04-15',
    category: 'Operational Expenses',
    subcategory: 'Miscellaneous',
    description: 'Miscellaneous expenses',
    amount: 400,
    isFixed: false,
    isOperational: true
  },
  // Operational Expenses - May
  {
    id: 75,
    aircraft: 'A7-CGO',
    date: '2023-05-08',
    category: 'Operational Expenses',
    subcategory: 'Crew Accommodation',
    description: 'Hilton Hotel London',
    amount: 7237,
    isFixed: false,
    isOperational: true
  }, {
    id: 76,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    category: 'Operational Expenses',
    subcategory: 'Crew Accommodation',
    description: 'Hilton Hotel New York',
    amount: 7000,
    isFixed: false,
    isOperational: true
  }, {
    id: 77,
    aircraft: 'A7-CGO',
    date: '2023-05-08',
    category: 'Operational Expenses',
    subcategory: 'Local Catering',
    description: 'Crew meals London',
    amount: 2771,
    isFixed: false,
    isOperational: true
  }, {
    id: 78,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    category: 'Operational Expenses',
    subcategory: 'Local Catering',
    description: 'Crew meals New York',
    amount: 2500,
    isFixed: false,
    isOperational: true
  }, {
    id: 79,
    aircraft: 'A7-CGO',
    date: '2023-05-08',
    category: 'Operational Expenses',
    subcategory: 'Airport Fees',
    description: 'VIP & CIP Hall London',
    amount: 1965,
    isFixed: false,
    isOperational: true
  }, {
    id: 80,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    category: 'Operational Expenses',
    subcategory: 'Airport Fees',
    description: 'VIP & CIP Hall New York',
    amount: 2000,
    isFixed: false,
    isOperational: true
  }, {
    id: 81,
    aircraft: 'A7-CGO',
    date: '2023-05-08',
    category: 'Operational Expenses',
    subcategory: 'Crew Transport',
    description: 'Transportation in London',
    amount: 261,
    isFixed: false,
    isOperational: true
  }, {
    id: 82,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    category: 'Operational Expenses',
    subcategory: 'Crew Transport',
    description: 'Transportation in New York',
    amount: 250,
    isFixed: false,
    isOperational: true
  }, {
    id: 83,
    aircraft: 'A7-CGO',
    date: '2023-05-08',
    category: 'Operational Expenses',
    subcategory: 'Miscellaneous',
    description: 'Miscellaneous expenses',
    amount: 444,
    isFixed: false,
    isOperational: true
  }, {
    id: 84,
    aircraft: 'A7-CGO',
    date: '2023-05-12',
    category: 'Operational Expenses',
    subcategory: 'Miscellaneous',
    description: 'Miscellaneous expenses',
    amount: 400,
    isFixed: false,
    isOperational: true
  },
  // Fixed Expenses - July
  {
    id: 85,
    aircraft: 'A7-CGO',
    date: '2023-07-01',
    category: 'Fixed Expenses',
    subcategory: 'Aircraft Lease',
    description: 'Monthly lease payment (ACMI)',
    amount: 770000,
    isFixed: true,
    isOperational: false
  }];
  // Get all expense categories
  const allCategories = [...new Set(expensesData.map(expense => expense.category))].sort();
  const allSubcategories = [...new Set(expensesData.map(expense => expense.subcategory))].sort();
  // Get all months in the data
  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', {
      month: 'long'
    });
  };
  const getMonthNumber = (dateString: string) => {
    const date = new Date(dateString);
    return date.getMonth() + 1;
  };
  const allMonths = ['March', 'April', 'May', 'June', 'July'];
  // Filter expenses based on selected filters
  const filteredExpenses = expensesData.filter(expense => {
    const matchesDateRange = expense.date >= dateRange.start && expense.date <= dateRange.end;
    const matchesAircraft = selectedAircraft === '' || expense.aircraft === selectedAircraft;
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(expense.category);
    return matchesDateRange && matchesAircraft && matchesCategory;
  });
  // Filter flights based on selected filters
  const filteredFlights = flightData.filter(flight => {
    const matchesDateRange = flight.date >= dateRange.start && flight.date <= dateRange.end;
    const matchesAircraft = selectedAircraft === '' || flight.aircraft === selectedAircraft;
    return matchesDateRange && matchesAircraft;
  });
  // Calculate flight metrics by month
  const flightMetricsByMonth: {
    [month: string]: {
      blockHours: number;
      flightHours: number;
      flightCount: number;
    };
  } = {};
  allMonths.forEach(month => {
    flightMetricsByMonth[month] = {
      blockHours: 0,
      flightHours: 0,
      flightCount: 0
    };
  });
  filteredFlights.forEach(flight => {
    const month = getMonthName(flight.date);
    if (flightMetricsByMonth[month]) {
      flightMetricsByMonth[month].blockHours += flight.blockHours;
      flightMetricsByMonth[month].flightHours += flight.flightHours;
      flightMetricsByMonth[month].flightCount += 1;
    }
  });
  // Calculate totals for flight metrics
  const totalFlightMetrics = {
    blockHours: Object.values(flightMetricsByMonth).reduce((sum, month) => sum + month.blockHours, 0),
    flightHours: Object.values(flightMetricsByMonth).reduce((sum, month) => sum + month.flightHours, 0),
    flightCount: Object.values(flightMetricsByMonth).reduce((sum, month) => sum + month.flightCount, 0)
  };
  // Group expenses by category and month
  const expensesByCategory: {
    [category: string]: {
      [subcategory: string]: {
        [month: string]: number;
        total: number;
      };
    };
  } = {};
  // Initialize the structure
  allCategories.forEach(category => {
    expensesByCategory[category] = {};
    const subcategories = allSubcategories.filter(sub => expensesData.some(exp => exp.category === category && exp.subcategory === sub));
    subcategories.forEach(subcategory => {
      expensesByCategory[category][subcategory] = {
        total: 0
      };
      allMonths.forEach(month => {
        expensesByCategory[category][subcategory][month] = 0;
      });
    });
  });
  // Fill in the data
  filteredExpenses.forEach(expense => {
    const month = getMonthName(expense.date);
    if (allMonths.includes(month)) {
      if (!expensesByCategory[expense.category][expense.subcategory]) {
        expensesByCategory[expense.category][expense.subcategory] = {
          total: 0
        };
        allMonths.forEach(m => {
          expensesByCategory[expense.category][expense.subcategory][m] = 0;
        });
      }
      expensesByCategory[expense.category][expense.subcategory][month] += expense.amount;
      expensesByCategory[expense.category][expense.subcategory].total += expense.amount;
    }
  });
  // Calculate monthly totals by category
  const monthlyTotalsByCategory: {
    [category: string]: {
      [month: string]: number;
      total: number;
    };
  } = {};
  allCategories.forEach(category => {
    monthlyTotalsByCategory[category] = {
      total: 0
    };
    allMonths.forEach(month => {
      monthlyTotalsByCategory[category][month] = 0;
    });
  });
  Object.keys(expensesByCategory).forEach(category => {
    Object.keys(expensesByCategory[category]).forEach(subcategory => {
      allMonths.forEach(month => {
        monthlyTotalsByCategory[category][month] += expensesByCategory[category][subcategory][month];
      });
      monthlyTotalsByCategory[category].total += expensesByCategory[category][subcategory].total;
    });
  });
  // Calculate monthly totals across all categories
  const monthlyTotals: {
    [month: string]: number;
  } = {};
  allMonths.forEach(month => {
    monthlyTotals[month] = 0;
  });
  Object.keys(monthlyTotalsByCategory).forEach(category => {
    allMonths.forEach(month => {
      monthlyTotals[month] += monthlyTotalsByCategory[category][month];
    });
  });
  // Calculate grand total
  const grandTotal = Object.values(monthlyTotals).reduce((sum, total) => sum + total, 0);
  // Calculate cost per flight hour by month
  const costPerFlightHourByMonth: {
    [month: string]: number;
  } = {};
  allMonths.forEach(month => {
    if (flightMetricsByMonth[month]?.flightHours > 0) {
      costPerFlightHourByMonth[month] = monthlyTotals[month] / flightMetricsByMonth[month].flightHours;
    } else {
      costPerFlightHourByMonth[month] = 0;
    }
  });
  // Calculate average cost per flight hour
  const averageCostPerFlightHour = totalFlightMetrics.flightHours > 0 ? grandTotal / totalFlightMetrics.flightHours : 0;
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const handleSelectAllCategories = () => {
    if (selectedCategories.length === allCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...allCategories]);
    }
  };
  const exportToExcel = () => {
    // In a real app, this would generate and download an Excel file
    alert('Exporting to Excel...');
  };
  return <div className="w-full">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
        Aircraft Financial Analytics
      </h1>
      <p className="text-gray-600 mb-4 md:mb-6">
        Detailed financial analysis for aircraft operations
      </p>
      <div className="bg-white rounded-lg shadow mb-4 md:mb-6">
        {/* Filters section */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Filters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Date Range Filter */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <CalendarIcon size={16} className="mr-2 text-gray-500" />
                Date Range
              </label>
              <div className="flex items-center space-x-2">
                <input type="date" value={dateRange.start} onChange={e => setDateRange({
                ...dateRange,
                start: e.target.value
              })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                <span className="text-gray-500">to</span>
                <input type="date" value={dateRange.end} onChange={e => setDateRange({
                ...dateRange,
                end: e.target.value
              })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            {/* Aircraft Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FilterIcon size={16} className="mr-2 text-gray-500" />
                Aircraft
              </label>
              <select value={selectedAircraft} onChange={e => setSelectedAircraft(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">All Aircraft</option>
                {aircraftData.map(aircraft => <option key={aircraft.id} value={aircraft.id}>
                    {aircraft.registration || aircraft.id} - {aircraft.model}
                  </option>)}
              </select>
            </div>
          </div>
          {/* Category Filters */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <FilterIcon size={16} className="mr-2 text-gray-500" />
                Expense Categories
              </label>
              <button onClick={handleSelectAllCategories} className="text-sm text-blue-600 hover:text-blue-800">
                {selectedCategories.length === allCategories.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allCategories.map(category => <label key={category} className="inline-flex items-center">
                  <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 mr-3 text-sm text-gray-700">
                    {category}
                  </span>
                </label>)}
            </div>
          </div>
          {/* View Mode Toggle */}
          <div className="flex items-center mb-4">
            <span className="text-sm font-medium text-gray-700 mr-3">
              View Mode:
            </span>
            <div className="flex bg-gray-200 rounded-md">
              <button onClick={() => setViewMode('detailed')} className={`px-3 py-1 text-sm rounded-md ${viewMode === 'detailed' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700'}`}>
                Detailed
              </button>
              <button onClick={() => setViewMode('pivot')} className={`px-3 py-1 text-sm rounded-md ${viewMode === 'pivot' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700'}`}>
                Pivot Table
              </button>
            </div>
          </div>
          {/* Export Button */}
          <div className="flex justify-end">
            <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center">
              <DownloadIcon size={16} className="mr-2" />
              Export to Excel
            </button>
          </div>
        </div>
        {viewMode === 'detailed' && <>
            {/* Flight Metrics Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th colSpan={7} className="px-6 py-3 text-left text-sm font-medium text-gray-900 uppercase tracking-wider bg-blue-50">
                      Flight Metrics
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Metric
                    </th>
                    {allMonths.map(month => <th key={month} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {month}
                      </th>)}
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                      Flight Hours Limit
                    </td>
                    {allMonths.map(month => <td key={`hours-limit-${month}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {month === 'March' || month === 'April' || month === 'May' ? '50' : '-'}
                      </td>)}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 bg-gray-100 text-center">
                      150
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                      Block Hours
                    </td>
                    {allMonths.map(month => <td key={`block-hours-${month}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {flightMetricsByMonth[month]?.blockHours.toFixed(1) || '-'}
                      </td>)}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100 text-center">
                      {totalFlightMetrics.blockHours.toFixed(1)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                      Number of Flights
                    </td>
                    {allMonths.map(month => <td key={`flights-${month}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {flightMetricsByMonth[month]?.flightCount || '-'}
                      </td>)}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100 text-center">
                      {totalFlightMetrics.flightCount}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                      Cost per Flight Hour ($)
                    </td>
                    {allMonths.map(month => <td key={`cost-per-hour-${month}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {costPerFlightHourByMonth[month] > 0 ? costPerFlightHourByMonth[month].toLocaleString('en-US', {
                    maximumFractionDigits: 0
                  }) : '-'}
                      </td>)}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100 text-center">
                      {averageCostPerFlightHour.toLocaleString('en-US', {
                    maximumFractionDigits: 0
                  })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Fixed Expenses Table */}
            <div className="overflow-x-auto border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th colSpan={7} className="px-6 py-3 text-left text-sm font-medium text-gray-900 uppercase tracking-wider bg-blue-50">
                      Fixed Expenses
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Expense Type
                    </th>
                    {allMonths.map(month => <th key={month} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {month}
                      </th>)}
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.keys(expensesByCategory['Fixed Expenses'] || {}).map((subcategory, idx) => <tr key={subcategory} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                          {subcategory}
                        </td>
                        {allMonths.map(month => <td key={`${subcategory}-${month}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            {expensesByCategory['Fixed Expenses'][subcategory][month] > 0 ? expensesByCategory['Fixed Expenses'][subcategory][month].toLocaleString('en-US') : '-'}
                          </td>)}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100 text-right">
                          {expensesByCategory['Fixed Expenses'][subcategory].total.toLocaleString('en-US')}
                        </td>
                      </tr>)}
                  <tr className="bg-blue-50 border-t-2 border-gray-300">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 border-r border-gray-200">
                      Total Fixed Expenses
                    </td>
                    {allMonths.map(month => <td key={`fixed-total-${month}`} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        {monthlyTotalsByCategory['Fixed Expenses']?.[month] > 0 ? monthlyTotalsByCategory['Fixed Expenses'][month].toLocaleString('en-US') : '-'}
                      </td>)}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 bg-gray-100 text-right">
                      {monthlyTotalsByCategory['Fixed Expenses']?.total.toLocaleString('en-US')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Variable Expenses Table */}
            <div className="overflow-x-auto border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th colSpan={7} className="px-6 py-3 text-left text-sm font-medium text-gray-900 uppercase tracking-wider bg-blue-50">
                      Variable Expenses
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Expense Type
                    </th>
                    {allMonths.map(month => <th key={month} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {month}
                      </th>)}
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.keys(expensesByCategory['Variable Expenses'] || {}).map((subcategory, idx) => <tr key={subcategory} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                        {subcategory}
                      </td>
                      {allMonths.map(month => <td key={`${subcategory}-${month}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {expensesByCategory['Variable Expenses'][subcategory][month] > 0 ? expensesByCategory['Variable Expenses'][subcategory][month].toLocaleString('en-US') : '-'}
                        </td>)}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100 text-right">
                        {expensesByCategory['Variable Expenses'][subcategory].total.toLocaleString('en-US')}
                      </td>
                    </tr>)}
                  <tr className="bg-blue-50 border-t-2 border-gray-300">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 border-r border-gray-200">
                      Total Variable Expenses
                    </td>
                    {allMonths.map(month => <td key={`variable-total-${month}`} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        {monthlyTotalsByCategory['Variable Expenses']?.[month] > 0 ? monthlyTotalsByCategory['Variable Expenses'][month].toLocaleString('en-US') : '-'}
                      </td>)}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 bg-gray-100 text-right">
                      {monthlyTotalsByCategory['Variable Expenses']?.total.toLocaleString('en-US')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Operational Expenses Table */}
            <div className="overflow-x-auto border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th colSpan={7} className="px-6 py-3 text-left text-sm font-medium text-gray-900 uppercase tracking-wider bg-blue-50">
                      Operational Expenses
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                      Expense Type
                    </th>
                    {allMonths.map(month => <th key={month} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {month}
                      </th>)}
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.keys(expensesByCategory['Operational Expenses'] || {}).map((subcategory, idx) => <tr key={subcategory} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                        {subcategory}
                      </td>
                      {allMonths.map(month => <td key={`${subcategory}-${month}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {expensesByCategory['Operational Expenses'][subcategory][month] > 0 ? expensesByCategory['Operational Expenses'][subcategory][month].toLocaleString('en-US') : '-'}
                        </td>)}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100 text-right">
                        {expensesByCategory['Operational Expenses'][subcategory].total.toLocaleString('en-US')}
                      </td>
                    </tr>)}
                  <tr className="bg-blue-50 border-t-2 border-gray-300">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 border-r border-gray-200">
                      Total Operational Expenses
                    </td>
                    {allMonths.map(month => <td key={`operational-total-${month}`} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        {monthlyTotalsByCategory['Operational Expenses']?.[month] > 0 ? monthlyTotalsByCategory['Operational Expenses'][month].toLocaleString('en-US') : '-'}
                      </td>)}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 bg-gray-100 text-right">
                      {monthlyTotalsByCategory['Operational Expenses']?.total.toLocaleString('en-US')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Grand Total Row */}
            <div className="overflow-x-auto border-t border-gray-200">
              <table className="min-w-full">
                <tbody>
                  <tr className="bg-gray-800 text-white">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold border-r border-gray-600">
                      Grand Total
                    </td>
                    {allMonths.map(month => <td key={`grand-total-${month}`} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right">
                        {monthlyTotals[month] > 0 ? monthlyTotals[month].toLocaleString('en-US') : '-'}
                      </td>)}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold bg-gray-700 text-right">
                      {grandTotal.toLocaleString('en-US')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>}
        {viewMode === 'pivot' && <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    Category
                  </th>
                  {allMonths.map(month => <th key={month} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {month}
                    </th>)}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allCategories.map(category => {
              // Category header row
              return <Fragment key={category}>
                      <tr className="bg-blue-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 border-r border-gray-200">
                          {category}
                        </td>
                        {allMonths.map(month => <td key={`${category}-${month}-total`} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                            {monthlyTotalsByCategory[category][month] > 0 ? `$${monthlyTotalsByCategory[category][month].toLocaleString('en-US')}` : '-'}
                          </td>)}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 bg-gray-100">
                          $
                          {monthlyTotalsByCategory[category].total.toLocaleString('en-US')}
                        </td>
                      </tr>
                      {/* Subcategory rows */}
                      {Object.keys(expensesByCategory[category] || {}).map((subcategory, idx) => <tr key={`${category}-${subcategory}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="pl-10 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                              {subcategory}
                            </td>
                            {allMonths.map(month => <td key={`${category}-${subcategory}-${month}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {expensesByCategory[category][subcategory][month] > 0 ? `$${expensesByCategory[category][subcategory][month].toLocaleString('en-US')}` : '-'}
                              </td>)}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">
                              $
                              {expensesByCategory[category][subcategory].total.toLocaleString('en-US')}
                            </td>
                          </tr>)}
                    </Fragment>;
            })}
                {/* Total Row */}
                <tr className="bg-gray-800 text-white">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white border-r border-gray-600">
                    Total
                  </td>
                  {allMonths.map(month => <td key={`total-${month}`} className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                      ${monthlyTotals[month]?.toLocaleString('en-US') || '0'}
                    </td>)}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white bg-gray-700">
                    ${grandTotal.toLocaleString('en-US')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>}
        {/* Mobile View - Summary */}
        <div className="md:hidden divide-y divide-gray-200">
          <div className="p-4 bg-blue-50">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Financial Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total Flight Hours:</span>
                <span className="text-sm font-medium">
                  {totalFlightMetrics.flightHours.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total Flights:</span>
                <span className="text-sm font-medium">
                  {totalFlightMetrics.flightCount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Fixed Expenses:</span>
                <span className="text-sm font-medium">
                  $
                  {monthlyTotalsByCategory['Fixed Expenses']?.total.toLocaleString('en-US') || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Variable Expenses:</span>
                <span className="text-sm font-medium">
                  $
                  {monthlyTotalsByCategory['Variable Expenses']?.total.toLocaleString('en-US') || '0'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  Operational Expenses:
                </span>
                <span className="text-sm font-medium">
                  $
                  {monthlyTotalsByCategory['Operational Expenses']?.total.toLocaleString('en-US') || '0'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-300">
                <span className="text-sm font-bold">Grand Total:</span>
                <span className="text-sm font-bold">
                  ${grandTotal.toLocaleString('en-US')}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sm font-bold">Cost Per Flight Hour:</span>
                <span className="text-sm font-bold">
                  $
                  {averageCostPerFlightHour.toLocaleString('en-US', {
                  maximumFractionDigits: 0
                })}
                </span>
              </div>
            </div>
          </div>
          {allMonths.map(month => <div key={`mobile-${month}`} className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                {month}
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Flight Hours:</span>
                    <span className="text-sm">
                      {flightMetricsByMonth[month]?.flightHours.toFixed(1) || '0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Flights:</span>
                    <span className="text-sm">
                      {flightMetricsByMonth[month]?.flightCount || '0'}
                    </span>
                  </div>
                </div>
                {Object.keys(expensesByCategory).map(category => monthlyTotalsByCategory[category][month] > 0 && <div key={`mobile-${month}-${category}`} className="border border-gray-200 rounded-md overflow-hidden">
                        <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              {category}
                            </span>
                            <span className="text-sm font-medium">
                              $
                              {monthlyTotalsByCategory[category][month].toLocaleString('en-US')}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 space-y-2">
                          {Object.keys(expensesByCategory[category]).map(subcategory => expensesByCategory[category][subcategory][month] > 0 && <div key={`mobile-${month}-${category}-${subcategory}`} className="flex justify-between">
                                  <span className="text-sm">{subcategory}</span>
                                  <span className="text-sm">
                                    $
                                    {expensesByCategory[category][subcategory][month].toLocaleString('en-US')}
                                  </span>
                                </div>)}
                        </div>
                      </div>)}
                <div className="bg-gray-800 text-white p-3 rounded-md">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Month Total:</span>
                    <span className="text-sm font-medium">
                      ${monthlyTotals[month].toLocaleString('en-US')}
                    </span>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default ExpenseAnalyticsPage;