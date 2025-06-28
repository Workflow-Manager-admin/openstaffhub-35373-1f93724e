import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import "./crud.css";

// PUBLIC_INTERFACE
export default function PositionsPage() {
  const [positions, setPositions] = useState([]);
  const [newPos, setNewPos] = useState("");

  useEffect(() => {
    fetchPositions();
    // eslint-disable-next-line
  }, []);

  async function fetchPositions() {
    try {
      const data = await api.get("/positions/");
      setPositions(data);
    } catch {
      setPositions([]);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    await api.post("/positions/", { name: newPos });
    setNewPos("");
    fetchPositions();
  }

  async function handleDelete(id) {
    await api.delete(`/positions/${id}`);
    fetchPositions();
  }

  return (
    <div>
      <h2>Job Positions</h2>
      <form className="crud-form" onSubmit={handleCreate}>
        <input
          placeholder="Position Title"
          value={newPos}
          onChange={(e) => setNewPos(e.target.value)}
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
            {positions.map(pos => (
              <tr key={pos.id}>
                <td>{pos.name}</td>
                <td>
                  <button
                    className="btn-del"
                    onClick={() => handleDelete(pos.id)}
                    aria-label="Delete"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
            {positions.length === 0 && (
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  No positions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
