import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./data/config";
import idToNameMap from "./data/userMap";

export default function Admin() {
  const { BASE_URL } = config;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [itemName, setItemName] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [fingerprintLogs, setFingerprintLogs] = useState([]);
  const [borrowedItems, setBorrowedItems] = useState([]);

  // Fetch logs
  const fetchLogs = React.useCallback(async (date = "") => {
    try {
      const url = date ? `${BASE_URL}/logs?date=${date}` : `${BASE_URL}/logs`;
      const res = await axios.get(url);
      setFingerprintLogs(res.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  }, [BASE_URL]);

  // Fetch items
  const fetchBorrowedItems = React.useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/borrowed-items`);
      setBorrowedItems(res.data);
    } catch (error) {
      console.error("Error fetching borrowed items:", error);
    }
  }, [BASE_URL]);

  const fetchAll = React.useCallback(() => {
    fetchLogs(selectedDate);
    fetchBorrowedItems();
  }, [fetchLogs, fetchBorrowedItems, selectedDate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAll();
      const interval = setInterval(fetchAll, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, fetchAll]);

  // Auto-fill name/regNo from map
  useEffect(() => {
    if (idToNameMap[id]) {
      setName(idToNameMap[id].name);
      setRegNo(idToNameMap[id].regNo);
    }
  }, [id]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "funlab" && password === "JC@bio") {
      setIsAuthenticated(true);
    } else {
      alert("❌ Invalid credentials");
    }
  };

  const handleSaveUser = async () => {
    if (!id || !name) {
      alert("⚠️ Fill both ID and Name");
      return;
    }
    try {
      await axios.post(`${BASE_URL}/save-user`, { id, name, regNo });
      alert("✅ User saved");
      setId("");
      setName("");
      setRegNo("");
      fetchAll();
    } catch (err) {
      console.error(err);
      alert("❌ Error saving user");
    }
  };

  const handleAddItem = async () => {
    if (!name || !regNo || !itemName || !issuedDate) {
      alert("⚠️ Fill all item fields");
      return;
    }
    try {
      await axios.post(`${BASE_URL}/borrow-item`, {
        name,
        regNo,
        item: itemName,
        issuedDate,
      });
      alert("✅ Item added");
      setName("");
      setRegNo("");
      setItemName("");
      setIssuedDate("");
      fetchAll();
    } catch (error) {
      console.error(error);
      alert("❌ Error adding item");
    }
  };

  const deleteLog = async (index) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      // Warning: The API expects the mongo _id, not the index.
      const logToDelete = fingerprintLogs[index];
      // The previous code was sending `index` to `${BASE_URL}/logs/${index}`. 
      // But the backend `server.js` uses `req.params.id` to delete by `_id`.
      // The frontend loop used index `i` which was just the array index.
      // Wait, looking at backend: `await logsCollection.deleteOne({ _id: new ObjectId(req.params.id) });`
      // So the frontend MUST send the `_id`.
      // The original code `deleteLog(i)`... sent `i`. That was likely broken if it was sending just the array index unless `index` variable WAS the id?
      // Let's look at original Admin.js line 264: `onClick={() => deleteLog(i)}`. And line 154: `delete(`${BASE_URL}/logs/${index}`)`.
      // This suggests the Original Code was likely sending the array index, which would FAIL on backend expecting ObjectId.
      // OR `log._id` was assumed.
      // I will fix this to use `log._id` if available.
      if (logToDelete && logToDelete._id) {
        try {
          await axios.delete(`${BASE_URL}/logs/${logToDelete._id}`);
          fetchAll();
        } catch (e) { console.error(e); alert("Failed to delete"); }
      } else {
        console.error("Log ID missing", logToDelete);
        alert("Cannot delete: ID missing");
      }
    }
  };

  const deleteItem = async (index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const itemToDelete = borrowedItems[index];
      if (itemToDelete && itemToDelete._id) {
        try {
          await axios.delete(`${BASE_URL}/borrowed-items/${itemToDelete._id}`);
          fetchAll();
        } catch (e) { console.error(e); alert("Failed to delete"); }
      } else {
        alert("Cannot delete: ID missing");
      }
    }
  };

  const downloadCSV = () => {
    if (fingerprintLogs.length === 0) {
      alert("⚠️ No data to download");
      return;
    }

    const headers = ["#", "ID", "Name", "Date", "Time", "Direction"];
    const rows = fingerprintLogs.map((log, i) => [
      i + 1,
      log.id,
      idToNameMap[log.id]?.name || log.name || "Unknown",
      log.date,
      log.time,
      log.direction,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `funlab_logs_${selectedDate || "all"}.csv`;
    link.click();
  };

  if (!isAuthenticated)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white font-sans">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg w-80 border border-gray-700">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Admin Login</h2>
          <input type="text" placeholder="Username" className="w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700 font-semibold transition-colors">
            Login
          </button>
        </form>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">Admin Panel - FUN LAB</h1>
          <button className="text-sm text-gray-400 hover:text-white" onClick={() => setIsAuthenticated(false)}>Logout</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* === Register User === */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl mb-4 font-semibold text-green-400 border-b border-gray-700 pb-2">Register Fingerprint User</h2>
            <div className="grid grid-cols-1 gap-3">
              <input placeholder="Fingerprint ID" className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
                value={id} onChange={(e) => setId(e.target.value)} />
              <input placeholder="Name" className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
                value={name} onChange={(e) => setName(e.target.value)} />
              <input placeholder="Reg No (optional)" className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
                value={regNo} onChange={(e) => setRegNo(e.target.value)} />
              <button className="bg-green-600 hover:bg-green-700 p-2 rounded font-semibold transition-colors mt-2" onClick={handleSaveUser}>
                Save User
              </button>
            </div>
          </div>

          {/* === Add Borrowed Item === */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl mb-4 font-semibold text-blue-400 border-b border-gray-700 pb-2">Add Borrowed Item</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input placeholder="Name" className="p-2 rounded bg-gray-700 border border-gray-600 text-white sm:col-span-2"
                value={name} onChange={(e) => setName(e.target.value)} />
              <input placeholder="Reg No" className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
                value={regNo} onChange={(e) => setRegNo(e.target.value)} />
              <input placeholder="Item Name" className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
                value={itemName} onChange={(e) => setItemName(e.target.value)} />
              <input type="date" className="p-2 rounded bg-gray-700 border border-gray-600 text-white sm:col-span-2"
                value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} />
              <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold transition-colors mt-2 sm:col-span-2" onClick={handleAddItem}>
                Add Item
              </button>
            </div>
          </div>
        </div>

        {/* === Fingerprint Logs === */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-purple-400">Fingerprint Logs</h2>
              <input type="date" className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
                value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500 transition-colors font-semibold"
              onClick={downloadCSV}>⬇ Download CSV</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left bg-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-gray-300 uppercase text-xs tracking-wider">
                  <th className="p-3">#</th><th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">Date</th>
                  <th className="p-3">Time</th><th className="p-3">Direction</th><th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {[...fingerprintLogs].reverse().map((log, i) => (
                  <tr key={i} className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-3 text-gray-400">{i + 1}</td>
                    <td className="p-3">{log.id}</td>
                    <td className="p-3 font-medium">{idToNameMap[log.id]?.name || "Unknown"}</td>
                    <td className="p-3 text-gray-400">{log.date}</td>
                    <td className="p-3 text-gray-400">{log.time}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${log.direction === 'In' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {log.direction}
                      </span>
                    </td>
                    <td className="p-3"><button className="text-red-400 hover:text-red-300 transition-colors" onClick={() => deleteLog(i)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* === Borrowed Items === */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-6 text-orange-400">Borrowed Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-gray-300 uppercase text-xs tracking-wider">
                  <th className="p-3">#</th><th className="p-3">Name</th><th className="p-3">Reg No</th>
                  <th className="p-3">Item</th><th className="p-3">Issued Date</th><th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {borrowedItems.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-800/50 transition-colors">
                    <td className="p-3 text-gray-400">{i + 1}</td>
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3 text-gray-400">{item.regNo}</td>
                    <td className="p-3 text-blue-300">{item.item}</td>
                    <td className="p-3 text-gray-400">{item.issuedDate}</td>
                    <td className="p-3"><button className="text-red-400 hover:text-red-300 transition-colors" onClick={() => deleteItem(i)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
