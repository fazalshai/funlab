import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  // === Backend URL ===
  const BASE_URL = "https://funlab-backend.onrender.com";

  // === Login state ===
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // === Form states ===
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
    if (isAuthenticated) {
      fetchAll();
      const interval = setInterval(fetchAll, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // === Login Handler ===
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "funlab" && password === "JC@bio") {
      setIsAuthenticated(true);
    } else {
      alert("❌ Invalid credentials. Try again.");
    }
  };

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

  // === CSV Download for Attendance ===
  const downloadCSV = () => {
    if (fingerprintLogs.length === 0) {
      alert("⚠️ No attendance data to download");
      return;
    }

    const headers = ["#", "ID", "Name", "Date", "Time", "Direction"];
    const rows = fingerprintLogs.map((log, i) => [
      i + 1,
      log.id,
      log.name,
      log.date,
      log.time,
      log.direction,
    ]);

    const csvContent =
      [headers, ...rows]
        .map((e) => e.map((x) => `"${x ?? ""}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `funlab_attendance_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // === Login Page ===
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-80"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-2 rounded text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // === Main Admin Panel ===
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
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Fingerprint Logs</h2>
        <button
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
          onClick={downloadCSV}
        >
          ⬇ Download CSV
        </button>
      </div>

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
