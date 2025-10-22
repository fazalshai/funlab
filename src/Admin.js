import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const BASE_URL = "https://funlab-backend.onrender.com";

  // ✅ Manual ID-to-name mapping
  const idToNameMap = {
    4: { name: "Madhu", regNo: "REG004" },
    5: { name: "Lahari", regNo: "REG005" },
    6: { name: "Swetha", regNo: "REG006" },
    7: { name: "Priyanka", regNo: "REG007" },
    8: { name: "Jacky", regNo: "REG008" },
    9: { name: "Fazal", regNo: "REG009" },
    10: { name: "Firoj Gazi", regNo: "REG010" },
    11: { name: "Jahnava", regNo: "REG011" },
    12: { name: "Greeshma", regNo: "REG012" },
    13: { name: "Divya", regNo: "REG013" },
    14: { name: "AKash Harsha", regNo: "REG014" },
    15: { name: "Hemanth", regNo: "REG015" },
    16: { name: "Sulthan", regNo: "REG016" },
    17: { name: "Sasikanth", regNo: "REG017" },
    18: { name: "Ashwini ", regNo: "REG018" },
    19: { name: "Siddu", regNo: "REG019" },
    20: { name: "Musavvir", regNo: "REG020" },
    21: { name: "Devi Sree", regNo: "REG021" },
    22: { name: "Sahadeb", regNo: "REG022" },
    23: { name: "Abdussami", regNo: "REG023" },
    24: { name: "Surraya", regNo: "REG024" },
    25: { name: "Sanjay", regNo: "REG025" },
    26: { name: "Usman", regNo: "REG026" },
    27: { name: "Dyani", regNo: "REG027" },
    28: { name: "Alekhya", regNo: "REG028" },
    29: { name: "Smitha", regNo: "REG029" },
    30: { name: "Sahaja", regNo: "REG030" },
      31: { name: "Daiwik ", regNo: "REG029" },
    32: { name: "Chakraborty", regNo: "REG030" },
      33: { name: "Pavan varma", regNo: "REG029" },
    34: { name: "Jyoshika", regNo: "REG030" },
  };

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

  const fetchLogs = async (date = "") => {
    try {
      const url = date ? `${BASE_URL}/logs?date=${date}` : `${BASE_URL}/logs`;
      const res = await axios.get(url);
      setFingerprintLogs(res.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const fetchBorrowedItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/borrowed-items`);
      setBorrowedItems(res.data);
    } catch (error) {
      console.error("Error fetching borrowed items:", error);
    }
  };

  const fetchAll = () => {
    fetchLogs(selectedDate);
    fetchBorrowedItems();
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAll();
      const interval = setInterval(fetchAll, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, selectedDate]);

  // ✅ Auto-fill name/regNo from map when ID changes
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
    await axios.delete(`${BASE_URL}/logs/${index}`);
    fetchAll();
  };

  const deleteItem = async (index) => {
    await axios.delete(`${BASE_URL}/borrowed-items/${index}`);
    fetchAll();
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <input type="text" placeholder="Username" className="w-full mb-4 p-2 rounded text-black"
            value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full mb-4 p-2 rounded text-black"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel - FUN LAB</h1>

      {/* === Register User === */}
      <h2 className="text-xl mb-3 font-semibold">Register Fingerprint User</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <input placeholder="Fingerprint ID" className="p-2 rounded text-black"
          value={id} onChange={(e) => setId(e.target.value)} />
        <input placeholder="Name" className="p-2 rounded text-black"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Reg No (optional)" className="p-2 rounded text-black"
          value={regNo} onChange={(e) => setRegNo(e.target.value)} />
        <button className="bg-green-600 p-2 rounded" onClick={handleSaveUser}>
          Save User
        </button>
      </div>

      {/* === Add Borrowed Item === */}
      <h2 className="text-xl mb-3 font-semibold">Add Borrowed Item</h2>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
        <input placeholder="Name" className="p-2 rounded text-black"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Reg No" className="p-2 rounded text-black"
          value={regNo} onChange={(e) => setRegNo(e.target.value)} />
        <input placeholder="Item Name" className="p-2 rounded text-black"
          value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <input type="date" className="p-2 rounded text-black"
          value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} />
        <button className="bg-blue-600 p-2 rounded" onClick={handleAddItem}>
          Add Item
        </button>
      </div>

      {/* === Fingerprint Logs === */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Fingerprint Logs</h2>
          <input type="date" className="p-2 rounded text-black"
            value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </div>
        <button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
          onClick={downloadCSV}>⬇ Download CSV</button>
      </div>

      <table className="w-full text-left bg-gray-800 rounded mb-6">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2">#</th><th>ID</th><th>Name</th><th>Date</th>
            <th>Time</th><th>Direction</th><th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {[...fingerprintLogs].reverse().map((log, i) => (
            <tr key={i} className="border-t border-gray-700">
              <td className="p-2">{i + 1}</td>
              <td>{log.id}</td>
              <td>{idToNameMap[log.id]?.name || "Unknown"}</td>
              <td>{log.date}</td>
              <td>{log.time}</td>
              <td>{log.direction}</td>
              <td><button className="text-red-500" onClick={() => deleteLog(i)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* === Borrowed Items === */}
      <h2 className="text-xl font-semibold mb-2">Borrowed Items</h2>
      <table className="w-full text-left bg-gray-800 rounded">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2">#</th><th>Name</th><th>Reg No</th>
            <th>Item</th><th>Issued Date</th><th>Delete</th>
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
              <td><button className="text-red-500" onClick={() => deleteItem(i)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
