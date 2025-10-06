import React, { useState, useEffect } from "react";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    name: "",
    regNo: "",
    contact: "",
    items: "",
  });

  // Load saved entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("funlabEntries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("funlabEntries", JSON.stringify(entries));
  }, [entries]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "fazal" && password === "983") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.regNo) {
      alert("Name and Registration Number are required");
      return;
    }
    setEntries([...entries, { ...form, id: Date.now() }]);
    setForm({ name: "", regNo: "", contact: "", items: "" });
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 p-8 rounded-lg shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Entry Form */}
      <form
        onSubmit={handleAdd}
        className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 max-w-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Add Entry</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="regNo"
          placeholder="Registration Number"
          value={form.regNo}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="items"
          placeholder="Items"
          value={form.items}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
        >
          Add Entry
        </button>
      </form>

      {/* Entries List */}
      <h2 className="text-2xl font-bold mb-4">Entries</h2>
      <div className="space-y-3">
        {entries.length === 0 ? (
          <p className="text-gray-400">No entries yet.</p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p><strong>Name:</strong> {entry.name}</p>
                <p><strong>Reg No:</strong> {entry.regNo}</p>
                <p><strong>Contact:</strong> {entry.contact}</p>
                <p><strong>Items:</strong> {entry.items}</p>
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
