import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import config from "./data/config";

// ─── IST Date Helper ─────────────────────────────────────────────────────────
function getTodayIST() {
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const y = ist.getUTCFullYear();
  const m = ist.getUTCMonth() + 1; // Unpadded to match live DB format
  const d = ist.getUTCDate();      // Unpadded to match live DB format
  return `${y}-${m}-${d}`;         // e.g. "2026-3-18"
}

function getISTClock() {
  const now = new Date();
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const h = String(ist.getUTCHours()).padStart(2, "0");
  const m = String(ist.getUTCMinutes()).padStart(2, "0");
  const s = String(ist.getUTCSeconds()).padStart(2, "0");
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const day = days[ist.getUTCDay()];
  return { time: `${h}:${m}:${s}`, day };
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #030712;
    --bg2: #0a0f1e;
    --glass: rgba(255,255,255,0.03);
    --glass-border: rgba(255,255,255,0.08);
    --neon-purple: #a855f7;
    --neon-cyan: #06b6d4;
    --neon-green: #10b981;
    --neon-red: #f43f5e;
    --neon-amber: #f59e0b;
    --text: #f1f5f9;
    --text-muted: #64748b;
    --row-hover: rgba(168,85,247,0.06);
  }

  .admin-root {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'Inter', sans-serif;
    color: var(--text);
    overflow-x: hidden;
  }

  /* Animated background mesh */
  .admin-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 20% -20%, rgba(168,85,247,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 100%, rgba(6,182,212,0.10) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .admin-content { position: relative; z-index: 1; }

  /* ── Header ── */
  .admin-header {
    border-bottom: 1px solid var(--glass-border);
    background: rgba(3,7,18,0.8);
    backdrop-filter: blur(20px);
    position: sticky;
    top: 0;
    z-index: 100;
    padding: 0 32px;
  }
  .admin-header-inner {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    gap: 24px;
  }
  .admin-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 18px;
    letter-spacing: -0.5px;
  }
  .admin-logo-icon {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, var(--neon-purple), var(--neon-cyan));
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .admin-logo span { background: linear-gradient(135deg, var(--neon-purple), var(--neon-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

  .admin-clock {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: var(--neon-cyan);
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(6,182,212,0.2);
    padding: 6px 14px;
    border-radius: 8px;
    background: rgba(6,182,212,0.05);
  }
  .clock-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--neon-green); animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }

  .admin-header-actions { display: flex; align-items: center; gap: 10px; }

  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; white-space: nowrap; }
  .btn-ghost { background: transparent; color: var(--text-muted); border: 1px solid var(--glass-border); }
  .btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.2); }
  .btn-danger { background: rgba(244,63,94,0.1); color: var(--neon-red); border: 1px solid rgba(244,63,94,0.25); }
  .btn-danger:hover { background: rgba(244,63,94,0.2); box-shadow: 0 0 20px rgba(244,63,94,0.2); }
  .btn-primary { background: linear-gradient(135deg, var(--neon-purple), #7c3aed); color: white; }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(168,85,247,0.3); }
  .btn-success { background: rgba(16,185,129,0.1); color: var(--neon-green); border: 1px solid rgba(16,185,129,0.25); }
  .btn-success:hover { background: rgba(16,185,129,0.2); }
  .btn-amber { background: rgba(245,158,11,0.1); color: var(--neon-amber); border: 1px solid rgba(245,158,11,0.25); }
  .btn-amber:hover { background: rgba(245,158,11,0.2); }

  /* ── Main container ── */
  .admin-main { max-width: 1400px; margin: 0 auto; padding: 32px; }

  /* ── Stats row ── */
  .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px; }
  .stat-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
  }
  .stat-card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }
  .stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
  .stat-icon.purple { background: rgba(168,85,247,0.15); }
  .stat-icon.cyan { background: rgba(6,182,212,0.15); }
  .stat-icon.green { background: rgba(16,185,129,0.15); }
  .stat-icon.amber { background: rgba(245,158,11,0.15); }
  .stat-info { flex: 1; }
  .stat-value { font-size: 24px; font-weight: 800; line-height: 1; }
  .stat-value.purple { color: var(--neon-purple); }
  .stat-value.cyan { color: var(--neon-cyan); }
  .stat-value.green { color: var(--neon-green); }
  .stat-value.amber { color: var(--neon-amber); }
  .stat-label { font-size: 12px; color: var(--text-muted); margin-top: 4px; font-weight: 500; }

  /* ── Cards ── */
  .card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 24px;
    backdrop-filter: blur(10px);
    transition: border-color 0.3s;
    margin-bottom: 24px;
  }
  .card:hover { border-color: rgba(255,255,255,0.12); }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; gap: 12px; flex-wrap: wrap; }
  .card-title { font-size: 15px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
  .card-title-dot { width: 8px; height: 8px; border-radius: 50%; }

  /* ── Form grid ── */
  .forms-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; margin-bottom: 24px; }
  .form-group { display: flex; flex-direction: column; gap: 10px; }
  .input-field {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    padding: 10px 14px;
    color: var(--text);
    font-size: 14px;
    font-family: inherit;
    transition: all 0.2s;
    outline: none;
    width: 100%;
  }
  .input-field::placeholder { color: var(--text-muted); }
  .input-field:focus { border-color: var(--neon-purple); background: rgba(168,85,247,0.05); box-shadow: 0 0 0 3px rgba(168,85,247,0.1); }
  .input-field[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }

  /* ── Table ── */
  .table-wrap { overflow-x: auto; border-radius: 12px; }
  table { width: 100%; border-collapse: collapse; }
  thead tr { background: rgba(255,255,255,0.04); }
  th { padding: 11px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted); text-align: left; border-bottom: 1px solid var(--glass-border); }
  td { padding: 12px 14px; font-size: 13.5px; border-bottom: 1px solid rgba(255,255,255,0.03); vertical-align: middle; }
  tbody tr { transition: background 0.15s; animation: fadeIn 0.3s ease; }
  tbody tr:hover { background: var(--row-hover); }
  tbody tr:last-child td { border-bottom: none; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }

  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.3px;
  }
  .badge-in { background: rgba(16,185,129,0.15); color: var(--neon-green); border: 1px solid rgba(16,185,129,0.3); }
  .badge-out { background: rgba(244,63,94,0.15); color: var(--neon-red); border: 1px solid rgba(244,63,94,0.3); }
  .badge-dir { background: rgba(168,85,247,0.15); color: var(--neon-purple); border: 1px solid rgba(168,85,247,0.3); }

  .delete-btn { background: none; border: none; color: var(--neon-red); font-size: 13px; cursor: pointer; padding: 4px 8px; border-radius: 6px; transition: all 0.2s; opacity: 0.6; }
  .delete-btn:hover { opacity: 1; background: rgba(244,63,94,0.1); }

  .mono { font-family: 'JetBrains Mono', monospace; font-size: 12px; }

  .empty-row td { text-align: center; color: var(--text-muted); padding: 40px; font-size: 13px; }

  /* ── Search ── */
  .search-wrap { position: relative; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 14px; }
  .search-input { padding-left: 36px !important; }

  /* ── Filter row ── */
  .filter-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

  /* ── Login ── */
  .login-wrap {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: var(--bg);
    position: relative;
    overflow: hidden;
  }
  .login-wrap::before {
    content: '';
    position: fixed; inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 30% 20%, rgba(168,85,247,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 70% 80%, rgba(6,182,212,0.14) 0%, transparent 60%);
    pointer-events: none;
  }
  .login-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    padding: 40px;
    width: 380px;
    backdrop-filter: blur(20px);
    position: relative;
    z-index: 1;
    animation: slideUp 0.4s ease;
  }
  @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  .login-title { font-size: 28px; font-weight: 800; text-align: center; margin-bottom: 8px; background: linear-gradient(135deg, var(--neon-purple), var(--neon-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .login-sub { text-align: center; color: var(--text-muted); font-size: 13px; margin-bottom: 32px; }
  .login-group { margin-bottom: 16px; }
  .login-label { font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; display: block; text-transform: uppercase; letter-spacing: 0.5px; }
  .login-btn { width: 100%; padding: 12px; border-radius: 12px; border: none; background: linear-gradient(135deg, var(--neon-purple), #7c3aed); color: white; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 8px; font-family: inherit; }
  .login-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(168,85,247,0.4); }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .admin-header { padding: 0 16px; }
    .admin-main { padding: 16px; }
    .admin-clock .clock-day { display: none; }
    .login-card { width: 90%; padding: 28px; }
  }

  /* ── Section divider ── */
  .section-sep { height: 1px; background: linear-gradient(90deg, transparent, var(--glass-border), transparent); margin: 8px 0 24px; }

  /* ── Shimmer on load ── */
  .shimmer {
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 6px;
    height: 14px;
    width: 80%;
  }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
`;

export default function Admin() {
  const { BASE_URL } = config;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminLevel, setAdminLevel] = useState("user"); // "user" | "super"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clock, setClock] = useState(getISTClock());

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [itemName, setItemName] = useState("");
  const [issuedDate, setIssuedDate] = useState("");

  // Date filter defaults to TODAY (IST)
  const [selectedDate, setSelectedDate] = useState(getTodayIST());
  const [searchQuery, setSearchQuery] = useState("");

  const [fingerprintLogs, setFingerprintLogs] = useState([]);
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleteFingerID, setDeleteFingerID] = useState("");
  const [deleteStatus, setDeleteStatus] = useState("");

  // Live clock (IST)
  useEffect(() => {
    const t = setInterval(() => setClock(getISTClock()), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      setRegisteredUsers(res.data);
      const map = {};
      res.data.forEach((u) => (map[u.id] = u));
      setUserMap(map);
    } catch (e) { console.error(e); }
  }, [BASE_URL]);

  const fetchLogs = useCallback(async (date = "") => {
    try {
      const url = date ? `${BASE_URL}/logs?date=${date}` : `${BASE_URL}/logs`;
      const res = await axios.get(url);
      setFingerprintLogs(res.data);
    } catch (e) { console.error(e); }
  }, [BASE_URL]);

  const fetchBorrowedItems = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/borrowed-items`);
      setBorrowedItems(res.data);
    } catch (e) { console.error(e); }
  }, [BASE_URL]);

  const fetchAll = useCallback(() => {
    fetchLogs(selectedDate);
    fetchBorrowedItems();
    fetchUsers();
    setLoading(false);
  }, [fetchLogs, fetchBorrowedItems, fetchUsers, selectedDate]);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      fetchAll();
      const iv = setInterval(fetchAll, 10000);
      return () => clearInterval(iv);
    }
  }, [isAuthenticated, fetchAll]);

  useEffect(() => {
    if (userMap[id]) { setName(userMap[id].name); setRegNo(userMap[id].regNo || ""); }
  }, [id, userMap]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "funlab" && password === "JC@bio123") {
      setAdminLevel("super");
      setIsAuthenticated(true);
    } else if (username === "funlab" && password === "JC@bio") {
      setAdminLevel("user");
      setIsAuthenticated(true);
    } else {
      alert("❌ Invalid credentials");
    }
  };

  const handleSaveUser = async () => {
    if (!id || !name) return alert("⚠️ Fill both ID and Name");
    try {
      await axios.post(`${BASE_URL}/save-user`, { id, name, regNo });
      setId(""); setName(""); setRegNo("");
      fetchAll();
    } catch { alert("❌ Error saving user"); }
  };

  const handleAddItem = async () => {
    if (!name || !regNo || !itemName || !issuedDate) return alert("⚠️ Fill all item fields");
    try {
      await axios.post(`${BASE_URL}/borrow-item`, { name, regNo, item: itemName, issuedDate });
      setName(""); setRegNo(""); setItemName(""); setIssuedDate("");
      fetchAll();
    } catch { alert("❌ Error adding item"); }
  };

  const deleteLog = async (id) => {
    if (!id) return alert("Cannot delete: ID missing");
    if (!window.confirm("Delete this log entry?")) return;
    try { await axios.delete(`${BASE_URL}/logs/${id}`); fetchAll(); }
    catch { alert("Failed to delete"); }
  };

  const deleteItem = async (id) => {
    if (!id) return alert("Cannot delete: ID missing");
    if (!window.confirm("Delete this borrowed item?")) return;
    try { await axios.delete(`${BASE_URL}/borrowed-items/${id}`); fetchAll(); }
    catch { alert("Failed to delete"); }
  };

  const handleDeleteFingerprint = async () => {
    const fid = parseInt(deleteFingerID);
    if (!fid || fid < 1 || fid > 127) return alert("⚠️ Enter a valid fingerprint ID (1-127)");
    if (!window.confirm(`Delete fingerprint slot ${fid} from the sensor? This cannot be undone.`)) return;
    try {
      setDeleteStatus("Queuing...");
      await axios.post(`${BASE_URL}/admin/delete-fingerprint`, { fingerprintId: fid });
      setDeleteStatus(`✅ Queued! ESP will delete slot ${fid} within 5 seconds.`);
      setDeleteFingerID("");
      setTimeout(() => setDeleteStatus(""), 5000);
    } catch { setDeleteStatus("❌ Failed to queue delete."); }
  };

  const downloadCSV = () => {
    if (!fingerprintLogs.length) return alert("⚠️ No data to download");
    const headers = ["#", "ID", "Name", "Date", "Time", "Direction"];
    const rows = fingerprintLogs.map((log, i) => [
      i + 1, log.id,
      userMap[log.id]?.name || log.name || "Unknown",
      log.date, log.time, log.direction,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `funlab_logs_${selectedDate || "all"}.csv`;
    link.click();
  };

  // Filtered logs (by search query and FUN LAB only)
  const filteredLogs = fingerprintLogs.filter((log) => {
    const uname = (userMap[log.id]?.name || log.name || "").toLowerCase();
    const isFunlab = uname.includes("funlab") || (log.direction || "").toUpperCase() === "FUN_LAB";
    
    // Admin page currently ONLY shows funlab entries
    if (!isFunlab) return false;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return uname.includes(q) || String(log.id).includes(q);
  });

  // Stats
  const todayIST = getTodayIST();
  
  // Create padded version of today's date for matching
  const [y, m, d] = todayIST.split("-");
  const todayPadded = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;

  // Count both padded and unpadded versions so old DB data and new DB data are both counted
  const todayCount = fingerprintLogs.filter(
    (l) => l.date === todayIST || l.date === todayPadded
  ).length;

  // ─── Login Screen ─────────────────────────────────────────────────────────
  if (!isAuthenticated)
    return (
      <>
        <style>{styles}</style>
        <div className="login-wrap" style={{ fontFamily: "'Inter',sans-serif" }}>
          <form onSubmit={handleLogin} className="login-card">
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ width: 64, height: 64, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="/images/funlab_logo_full.png" alt="FUN LAB" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h1 className="login-title">FUN LAB</h1>
              <p className="login-sub">Admin Portal · Secured Access</p>
            </div>
            <div className="login-group">
              <label className="login-label">Username</label>
              <input className="input-field" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
            </div>
            <div className="login-group">
              <label className="login-label">Password</label>
              <input type="password" className="input-field" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </div>
            <button type="submit" className="login-btn">Sign In →</button>
          </form>
        </div>
      </>
    );

  // ─── Main Dashboard ───────────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>
      <div className="admin-root">
        <div className="admin-content">

          {/* ── Header ── */}
          <header className="admin-header">
            <div className="admin-header-inner">
              <div className="admin-logo">
                <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src="/images/funlab_logo_full.png" alt="FUN LAB" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <span>FUN LAB</span>
                <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: 13 }}>/ Admin</span>
              </div>

              <div className="admin-clock">
                <div className="clock-dot" />
                <span className="clock-day" style={{ color: "var(--text-muted)", fontSize: 11 }}>{clock.day}</span>
                <span>{clock.time}</span>
                <span style={{ color: "var(--text-muted)", fontSize: 11 }}>IST</span>
              </div>

              <div className="admin-header-actions">
                <button className="btn btn-danger" onClick={async () => {
                  if (window.confirm("Send remote unlock command?")) {
                    try { await axios.post(`${BASE_URL}/admin/unlock`); alert("🔓 Unlock command sent!"); }
                    catch { alert("Error sending command"); }
                  }
                }}>🔓 Unlock</button>
                <button className="btn" style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)" }}
                  onClick={async () => {
                    if (window.confirm("⚠️ This will DELETE all logs older than the current month (March 2026). This cannot be undone. Continue?")) {
                      try {
                        const res = await axios.delete(`${BASE_URL}/admin/cleanup-old-logs`);
                        alert(res.data.message);
                        fetchAll();
                      } catch { alert("❌ Cleanup failed"); }
                    }
                  }}>🗑 Clear Old Data</button>
                <button className="btn btn-ghost" onClick={() => setIsAuthenticated(false)}>Logout</button>
              </div>
            </div>
          </header>

          <main className="admin-main">

            {/* ── Stats ── */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-icon purple">👁️</div>
                <div className="stat-info">
                  <div className="stat-value purple">{loading ? "—" : todayCount}</div>
                  <div className="stat-label">Today's Entries</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon cyan">📊</div>
                <div className="stat-info">
                  <div className="stat-value cyan">{loading ? "—" : filteredLogs.length}</div>
                  <div className="stat-label">Filtered Logs</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green">👤</div>
                <div className="stat-info">
                  <div className="stat-value green">{loading ? "—" : registeredUsers.length}</div>
                  <div className="stat-label">Registered Users</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon amber">📦</div>
                <div className="stat-info">
                  <div className="stat-value amber">{loading ? "—" : borrowedItems.length}</div>
                  <div className="stat-label">Borrowed Items</div>
                </div>
              </div>
            </div>

            {/* ── Forms ── */}
            <div className="forms-grid">
              {/* Register User — visible to all levels */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">
                    <div className="card-title-dot" style={{ background: "var(--neon-green)" }} />
                    Register User
                  </h2>
                </div>
                <div className="form-group">
                  <input className="input-field" placeholder="Fingerprint ID" value={id} onChange={(e) => setId(e.target.value)} />
                  <input className="input-field" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <input className="input-field" placeholder="Reg No (optional)" value={regNo} onChange={(e) => setRegNo(e.target.value)} />
                  <button className="btn btn-success" style={{ width: "100%", justifyContent: "center", padding: "10px 16px" }} onClick={handleSaveUser}>
                    ＋ Save User
                  </button>
                </div>
              </div>

              {/* Borrow Item — super admin only */}
              {adminLevel === "super" && (
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">
                    <div className="card-title-dot" style={{ background: "var(--neon-cyan)" }} />
                    Issue Item
                  </h2>
                </div>
                <div className="form-group">
                  <input className="input-field" placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <input className="input-field" placeholder="Reg No" value={regNo} onChange={(e) => setRegNo(e.target.value)} />
                  <input className="input-field" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                  <input type="date" className="input-field" value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} />
                  <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "10px 16px" }} onClick={handleAddItem}>
                    ＋ Add Item
                  </button>
                </div>
              </div>
              )}
            </div>

            {/* ── Delete Fingerprint from Sensor — super admin only ── */}
            {adminLevel === "super" && (
            <div className="card" style={{ borderColor: "rgba(244,63,94,0.2)" }}>
              <div className="card-header">
                <h2 className="card-title">
                  <div className="card-title-dot" style={{ background: "var(--neon-red)" }} />
                  Delete Fingerprint from Sensor
                </h2>
              </div>
              <div className="form-group">
                <input
                  className="input-field"
                  placeholder="Fingerprint Slot ID (1–127)"
                  type="number" min="1" max="127"
                  value={deleteFingerID}
                  onChange={(e) => setDeleteFingerID(e.target.value)}
                />
                <button
                  className="btn btn-danger"
                  style={{ width: "100%", justifyContent: "center", padding: "10px 16px" }}
                  onClick={handleDeleteFingerprint}
                >
                  🗑 Delete from Sensor
                </button>
                {deleteStatus && (
                  <div style={{ fontSize: 13, color: deleteStatus.startsWith("✅") ? "var(--neon-green)" : "var(--neon-red)", marginTop: 4 }}>
                    {deleteStatus}
                  </div>
                )}
              </div>
            </div>
            )}

            {/* ── Registered Users — super admin only ── */}
            {adminLevel === "super" && (
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">
                  <div className="card-title-dot" style={{ background: "var(--neon-green)" }} />
                  Registered Users
                  <span style={{ background: "rgba(16,185,129,0.15)", color: "var(--neon-green)", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{registeredUsers.length}</span>
                </h2>
              </div>
              <div className="table-wrap" style={{ maxHeight: 240, overflowY: "auto" }}>
                <table>
                  <thead>
                    <tr><th>ID</th><th>Name</th><th>Reg No</th></tr>
                  </thead>
                  <tbody>
                    {registeredUsers.length === 0
                      ? <tr className="empty-row"><td colSpan="3">No users registered yet</td></tr>
                      : registeredUsers.map((u, i) => (
                        <tr key={i}>
                          <td><span className="mono" style={{ color: "var(--neon-cyan)" }}>{u.id}</span></td>
                          <td style={{ fontWeight: 500 }}>{u.name}</td>
                          <td style={{ color: "var(--text-muted)" }}>{u.regNo || "—"}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}

            {/* ── Fingerprint Logs ── */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">
                  <div className="card-title-dot" style={{ background: "var(--neon-purple)" }} />
                  Fingerprint Logs
                  <span style={{ background: "rgba(168,85,247,0.15)", color: "var(--neon-purple)", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{filteredLogs.length}</span>
                </h2>
                <div className="filter-row">
                  <div className="search-wrap">
                    <span className="search-icon">🔍</span>
                    <input className="input-field search-input" style={{ width: 180 }} placeholder="Search name / ID…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                  <input type="date" className="input-field" style={{ width: 160 }} value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); fetchLogs(e.target.value); }} />
                  <button className="btn btn-amber" onClick={downloadCSV}>⬇ CSV</button>
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>#</th><th>ID</th><th>Name</th><th>Date</th><th>Time</th><th>Direction</th>{adminLevel === "super" && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {loading
                      ? Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i}><td colSpan={7}><div className="shimmer" style={{ width: "100%" }} /></td></tr>
                      ))
                      : filteredLogs.length === 0
                        ? <tr className="empty-row"><td colSpan="7">No logs found for this date / filter</td></tr>
                        : filteredLogs.map((log, i) => (
                          <tr key={i}>
                            <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                            <td><span className="mono" style={{ color: "var(--neon-cyan)" }}>{log.id}</span></td>
                            <td style={{ fontWeight: 500 }}>{userMap[log.id]?.name || log.name || "Unknown"}</td>
                            <td style={{ color: "var(--text-muted)" }} className="mono">{log.date}</td>
                            <td style={{ color: "var(--text-muted)" }} className="mono">{log.time}</td>
                            <td>
                              {log.direction === "In"
                                ? <span className="badge badge-in">↑ IN</span>
                                : log.direction === "Out"
                                  ? <span className="badge badge-out">↓ OUT</span>
                                  : <span className="badge badge-dir">{log.direction}</span>}
                            </td>
                            <td>
                              {adminLevel === "super" && (
                                <button className="delete-btn" onClick={() => deleteLog(log._id)}>✕ Delete</button>
                              )}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Borrowed Items — super admin only ── */}
            {adminLevel === "super" && (
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">
                  <div className="card-title-dot" style={{ background: "var(--neon-amber)" }} />
                  Borrowed Items
                  <span style={{ background: "rgba(245,158,11,0.15)", color: "var(--neon-amber)", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{borrowedItems.length}</span>
                </h2>
              </div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr><th>#</th><th>Name</th><th>Reg No</th><th>Item</th><th>Issued Date</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {borrowedItems.length === 0
                      ? <tr className="empty-row"><td colSpan="6">No items currently borrowed</td></tr>
                      : borrowedItems.map((item, i) => (
                        <tr key={i}>
                          <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                          <td style={{ fontWeight: 500 }}>{item.name}</td>
                          <td style={{ color: "var(--text-muted)" }} className="mono">{item.regNo}</td>
                          <td style={{ color: "var(--neon-cyan)" }}>{item.item}</td>
                          <td style={{ color: "var(--text-muted)" }} className="mono">{item.issuedDate}</td>
                          <td>
                            <button className="delete-btn" onClick={() => deleteItem(item._id)}>✕ Delete</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}

          </main>
        </div>
      </div>
    </>
  );
}
