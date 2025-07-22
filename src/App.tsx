import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import FlightDataEntryPage from './pages/FlightDataEntryPage';
import AircraftExpensesEntryPage from './pages/AircraftExpensesEntryPage';
import FlightDataViewPage from './pages/FlightDataViewPage';
import ExpensesDataViewPage from './pages/ExpensesDataViewPage';
import ExpenseAnalyticsPage from './pages/ExpenseAnalyticsPage';
import DashboardPage from './pages/DashboardPage';
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  return <Router>
      <div className="w-full min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />} />
          <Route path="/" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="flight-entry" element={<FlightDataEntryPage />} />
            <Route path="expense-entry" element={<AircraftExpensesEntryPage />} />
            <Route path="flights" element={<FlightDataViewPage />} />
            <Route path="expenses" element={<ExpensesDataViewPage />} />
            <Route path="expense-analytics" element={<ExpenseAnalyticsPage />} />
          </Route>
          <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </div>
    </Router>;
}