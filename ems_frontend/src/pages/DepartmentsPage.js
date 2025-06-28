import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import "./crud.css";

// PUBLIC_INTERFACE
export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState("");

  useEffect(() => {
    fetchDepartments();
    // eslint-disable-next-line
  }, []);

  async function fetchDepartments() {
    try {
      const data = await api.get("/departments/");
      setDepartments(data);
    } catch {
      setDepartments([]);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    await api.post("/departments/", { name: newDept });
    setNewDept("");
    fetchDepartments();
  }

  async function handleDelete(id) {
    await api.delete(`/departments/${id}`);
    fetchDepartments();
  }

  return (
    <div>
      <h2>Departments</h2>
      <form className="crud-form" onSubmit={handleCreate}>
        <input
          placeholder="Department Name"
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
          required
        />
        <button type="submit" className="btn-main">Add</button>
      </form>
      <div className="crud-table-wrap">
        <table className="crud-table">
          <thead>
            <tr>
              <th>Name</th>
              <th width={40}></th>
            </tr>
          </thead>
          <tbody>
            {departments.map(dept => (
              <tr key={dept.id}>
                <td>{dept.name}</td>
                <td>
                  <button
                    className="btn-del"
                    onClick={() => handleDelete(dept.id)}
                    aria-label="Delete"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
            {departments.length === 0 && (
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
