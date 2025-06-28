import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainLayout from "./Layout";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import PositionsPage from "./pages/PositionsPage";

// PUBLIC_INTERFACE
function App() {
  // Set theme variables on mount (light, matches requirements)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="employees/*" element={<EmployeesPage />} />
          <Route path="departments/*" element={<DepartmentsPage />} />
          <Route path="positions/*" element={<PositionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
