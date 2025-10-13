import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  // === Backend URL ===
  const BASE_URL = "https://funlab-backend.onrender.com";

  // === States ===
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [itemName, setItemName] = useState("");
  const [issuedDate, setIssuedDate] = useState("");

  const [fingerprintLogs, setFingerprintLogs] = useState([]);
  const [borrowedItems, setBorrowedItems] = useState([]);

  // === Fetch all data ===
  const fetchAll = async () => {
    try {
      const [logsRes, borrowedRes] = await Promise.all([
        axios.get(`${BASE_URL}/logs`),
        axios.get(`${BASE_URL}/borrowed-items`),
      ]);
      setFingerprintLogs(logsRes.data);
      setBorrowedItems(borrowedRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAll();
    // Auto-refresh every 10 seconds for live updates
    const interval = setInterval(fetchAll, 10000);
    return () => clearInterval(interval);
  }, []);

  // === Save Fingerprint User Info ===
  const handleSaveUser = async () => {
    if (!id || !name) {
      alert("⚠️ Please fill both ID and Name fields");
      return;
    }
    try {
      await axios.post(`${BASE_URL}/save-user`, { id, name, regNo });
      alert("✅ User information saved successfully");
      setId("");
      setName("");
      setRegNo("");
      fetchAll();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("❌ Error saving user info");
    }
  };

  // === Add Borrowed Item ===
  const handleAddItem = async () => {
    if (!name || !regNo || !itemName || !issuedDate) {
      alert("⚠️ Please fill all item fields");
      return;
    }
    try {
      await axios.post(`${BASE_URL}/borrow-item`, {
        name,
        regNo,
        item: itemName,
        issuedDate,
      });
      alert("✅ Item added successfully");
      setName("");
      setRegNo("");
      setItemName("");
      setIssuedDate("");
      fetchAll();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("❌ Error adding item");
    }
  };

  // === Delete Logs / Items ===
  const deleteLog = async (i) => {
    await axios.delete(`${BASE_URL}/logs/${i}`);
    fetchAll();
  };

  const deleteItem = async (i) => {
    await axios.delete(`${BASE_URL}/borrowed-items/${i}`);
    fetchAll();
  };

  // === Render ===
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin Panel - FUN LAB
      </h1>

      {/* === Register Fingerprint User === */}
      <h2 className="text-xl mb-3 font-semibold">Register Fingerprint User</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <input
          placeholder="Fingerprint ID"
          className="p-2 rounded text-black"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          placeholder="Name"
          className="p-2 rounded text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Reg No (optional)"
          className="p-2 rounded text-black"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
        />
        <button className="bg-green-600 p-2 rounded" onClick={handleSaveUser}>
          Save User
        </button>
      </div>

      {/* === Borrowed Item Section === */}
      <h2 className="text-xl mb-3 font-semibold">Add Borrowed Item</h2>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
        <input
          placeholder="Name"
          className="p-2 rounded text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Reg No"
          className="p-2 rounded text-black"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
        />
        <input
          placeholder="Item Name"
          className="p-2 rounded text-black"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="date"
          className="p-2 rounded text-black"
          value={issuedDate}
          onChange={(e) => setIssuedDate(e.target.value)}
        />
        <button className="bg-blue-600 p-2 rounded" onClick={handleAddItem}>
          Add Item
        </button>
      </div>

      {/* === Fingerprint Logs === */}
      <h2 className="text-xl font-semibold mb-2">Fingerprint Logs</h2>
      <table className="w-full text-left bg-gray-800 rounded mb-6">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2">#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Direction</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {[...fingerprintLogs].reverse().map((log, i) => (
            <tr key={i} className="border-t border-gray-700">
              <td className="p-2">{i + 1}</td>
              <td>{log.id}</td>
              <td>{log.name}</td>
              <td>{log.date}</td>
              <td>{log.time}</td>
              <td>{log.direction}</td>
              <td>
                <button className="text-red-500" onClick={() => deleteLog(i)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* === Borrowed Items === */}
      <h2 className="text-xl font-semibold mb-2">Borrowed Items</h2>
      <table className="w-full text-left bg-gray-800 rounded">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2">#</th>
            <th>Name</th>
            <th>Reg No</th>
            <th>Item</th>
            <th>Issued Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {borrowedItems.map((item, i) => (
            <tr key={i} className="border-t border-gray-700">
              <td className="p-2">{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.regNo}</td>
              <td>{item.item}</td>
              <td>{item.issuedDate}</td>
              <td>
                <button className="text-red-500" onClick={() => deleteItem(i)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
