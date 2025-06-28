import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { api } from "../utils/api";

// PUBLIC_INTERFACE
export default function DashboardPage() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [emps, depts, posns] = await Promise.all([
          api.get("/employees/count"),
          api.get("/departments/count"),
          api.get("/positions/count"),
        ]);
        setCounts({
          employees: emps.count ?? 0,
          departments: depts.count ?? 0,
          positions: posns.count ?? 0,
        });
      } catch (e) {
        setCounts(null);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="stats-cards">
        <StatsCard title="Employees" value={counts?.employees ?? "-"} />
        <StatsCard title="Departments" value={counts?.departments ?? "-"} />
        <StatsCard title="Job Positions" value={counts?.positions ?? "-"} />
      </div>
    </div>
  );
}

function StatsCard({ title, value }) {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
