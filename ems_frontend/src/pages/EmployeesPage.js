import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import "./crud.css";

// PUBLIC_INTERFACE
export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", department: "", position: "" });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line
  }, []);

  // PUBLIC_INTERFACE
  async function fetchEmployees() {
    setRefreshing(true);
    try {
      const data = await api.get("/employees/");
      setEmployees(data);
    } catch (e) {
      setEmployees([]);
    }
    setRefreshing(false);
  }

  // PUBLIC_INTERFACE
  async function handleCreate(e) {
    e.preventDefault();
    await api.post("/employees/", form);
    setForm({ name: "", department: "", position: "" });
    fetchEmployees();
  }

  // PUBLIC_INTERFACE
  async function handleDelete(id) {
    await api.delete(`/employees/${id}`);
    fetchEmployees();
  }

  // PUBLIC_INTERFACE
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <h2>Employees</h2>
      <form className="crud-form" onSubmit={handleCreate}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />
        <input
          name="position"
          placeholder="Job Position"
          value={form.position}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-main">Add</button>
      </form>
      <div className="crud-table-wrap">
        <table className="crud-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Job Position</th>
              <th width={40}></th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>
                  <button
                    className="btn-del"
                    onClick={() => handleDelete(emp.id)}
                    aria-label="Delete"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  {refreshing ? "Loading..." : "No employees found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
