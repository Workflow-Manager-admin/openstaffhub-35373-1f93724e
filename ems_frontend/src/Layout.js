import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Layout.css";
import { COLORS } from "./theme";

// PUBLIC_INTERFACE
export function TopNavBar() {
  return (
    <nav className="ems-nav">
      <div className="ems-brand">
        <Link to="/" className="ems-title">
          <span style={{ color: COLORS.primary, fontWeight: "bold" }}>OpenStaffHub</span>
          <span className="ems-dot" style={{ color: COLORS.accent }}>.</span>
          <span className="ems-sys-label" style={{ color: COLORS.secondary }}>EMS</span>
        </Link>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
export function SideBar() {
  return (
    <aside className="ems-sidebar">
      <div className="ems-sidebar-content">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "ems-sblink active" : "ems-sblink"}>
          Dashboard
        </NavLink>
        <NavLink to="/employees" className={({isActive}) => isActive ? "ems-sblink active" : "ems-sblink"}>
          Employees
        </NavLink>
        <NavLink to="/departments" className={({isActive}) => isActive ? "ems-sblink active" : "ems-sblink"}>
          Departments
        </NavLink>
        <NavLink to="/positions" className={({isActive}) => isActive ? "ems-sblink active" : "ems-sblink"}>
          Job Positions
        </NavLink>
      </div>
    </aside>
  );
}

// PUBLIC_INTERFACE
export default function MainLayout() {
  return (
    <div className="ems-root">
      <TopNavBar />
      <div className="ems-main">
        <SideBar />
        <div className="ems-content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
