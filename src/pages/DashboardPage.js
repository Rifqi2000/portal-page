import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedBidang, setSelectedBidang] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');

  const sidebarGradient = 'linear-gradient(135deg, #F98025, #FDB46C)';

  const pieData = [
    { name: 'Perumahan', value: 45 },
    { name: 'Permukiman', value: 30 },
    { name: 'RPM', value: 15 },
    { name: 'Pusdatin', value: 10 },
  ];

  const allBarData = [
    { name: 'Perumahan', approved: 25, rejected: 8, pending: 7, month: 'Feb' },
    { name: 'Permukiman', approved: 22, rejected: 6, pending: 2, month: 'Feb' },
    { name: 'Perumahan', approved: 30, rejected: 10, pending: 5, month: 'Jan' },
    { name: 'Permukiman', approved: 20, rejected: 5, pending: 5, month: 'Jan' },
    { name: 'RPM', approved: 10, rejected: 3, pending: 2, month: 'Jan' },
    { name: 'Pusdatin', approved: 5, rejected: 3, pending: 2, month: 'Jan' },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const filteredBarDataRaw = allBarData.filter(item => {
    const bidangMatch = selectedBidang === 'All' || item.name === selectedBidang;
    const monthMatch = selectedMonth === 'All' || item.month === selectedMonth;
    return bidangMatch && monthMatch;
  });

  const latestEntriesMap = new Map();
  months.slice().reverse().forEach(month => {
    filteredBarDataRaw.forEach(entry => {
      if (entry.month === month && !latestEntriesMap.has(entry.name)) {
        latestEntriesMap.set(entry.name, entry);
      }
    });
  });
  const latestBarData = Array.from(latestEntriesMap.values());

  const downloadData = [
    { name: 'Data RTLH', value: 150 },
    { name: 'Data Permukiman', value: 120 },
    { name: 'Data RPM', value: 90 },
    { name: 'Data Pusdatin', value: 75 },
  ];

  const downloadTrend = [
    { week: 'Week 1', downloads: 50 },
    { week: 'Week 2', downloads: 80 },
    { week: 'Week 3', downloads: 60 },
    { week: 'Week 4', downloads: 100 },
  ];

  const COLORS = ['#00b894', '#0984e3', '#d63031', '#6c5ce7'];

  return (
    <div className="d-flex" style={{ minHeight: '100vh', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
      <div
        className={`text-white d-flex flex-column ${sidebarOpen ? 'px-4 pt-5' : 'px-3 pt-5'}`}
        style={{
          width: sidebarOpen ? '250px' : '100px',
          background: sidebarGradient,
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
          transition: 'width 0.3s',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div className="d-flex align-items-center">
            <i className="bi bi-folder-fill me-2 fs-5"></i>
            {sidebarOpen && <span className="fs-5 fw-semibold">Portal Data</span>}
          </div>
          <button
            className="btn btn-sm btn-outline-light d-flex align-items-center justify-content-center"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Sembunyikan Sidebar' : 'Tampilkan Sidebar'}
            style={{ width: '36px', height: '36px', marginLeft: sidebarOpen ? '8px' : '0px' }}
          >
            <i
              className="bi bi-list"
              style={{
                fontSize: '1.25rem',
                transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(90deg)',
                transition: 'transform 0.3s ease',
              }}
            ></i>
          </button>
        </div>
        <ul className="nav flex-column w-100 mt-4">
          <li className="nav-item mb-3 w-100">
            <button
              className={`btn w-100 text-start ${location.pathname === '/dashboard' ? 'btn-light text-dark' : 'btn-outline-light'}`}
              onClick={() => navigate('/dashboard')}
            >
              <i className="bi bi-speedometer2 me-2"></i>{sidebarOpen && 'Dashboard'}
            </button>
          </li>
          <li className="nav-item mb-3 w-100">
            <button
              className={`btn w-100 text-start ${location.pathname === '/data-page' || location.pathname === '/data-page/preview' ? 'btn-light text-dark' : 'btn-outline-light'}`}
              onClick={() => navigate('/data-page')}
            >
              <i className="bi bi-table me-2"></i>{sidebarOpen && 'Kumpulan Data'}
            </button>
          </li>
          <li className="nav-item mb-3 w-100">
            <button
              className={`btn w-100 text-start ${location.pathname === '/history-page' ? 'btn-light text-dark' : 'btn-outline-light'}`}
              onClick={() => navigate('/history-page')}
            >
              <i className="bi bi-clock-history me-2"></i>{sidebarOpen && 'Riwayat Data'}
            </button>
          </li>
          <li className="nav-item mb-3 w-100">
            <button
              className={`btn w-100 text-start ${location.pathname === '/create-database' ? 'btn-light text-dark' : 'btn-outline-light'}`}
              onClick={() => navigate('/create-database')}
            >
              <i className="bi bi-database-fill-add me-2"></i>{sidebarOpen && 'Input Data Baru'}
            </button>
          </li>
          <li className="nav-item mb-3 w-100">
            <button
              className={`btn w-100 text-start ${location.pathname === '/approval-page' ? 'btn-light text-dark' : 'btn-outline-light'}`}
              onClick={() => navigate('/approval-page')}
            >
              <i className="bi bi-check2-square me-2"></i>{sidebarOpen && 'Approval Data'}
            </button>
          </li>
        </ul>
      </div>

      <div
          className="flex-grow-1 p-4 pt-5"
          style={{
            backgroundColor: '#ffffff',
            transition: '0.3s',
            marginLeft: sidebarOpen ? '250px' : '100px',
            width: '100%',
          }}
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <h2 className="fw-bold text-dark mb-0">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </h2>
            <button className="btn btn-outline-danger" onClick={() => navigate('/')}>
              Logout
            </button>
          </div>
          <div className="row g-3 mb-4">
          {['Total Data Masuk: 800', 'Approved: 600', 'Pending: 120', 'Rejected: 80'].map((value, i) => (
            <div className="col-md-3" key={i}>
              <div className="card shadow-sm h-100">
                <div className="card-body text-center d-flex flex-column justify-content-center">
                  <h5 className="fw-bold">{value}</h5>
                  <small className="text-muted">Update per minggu</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex gap-3 mb-4">
          <select className="form-select w-auto" value={selectedBidang} onChange={(e) => setSelectedBidang(e.target.value)}>
            <option value="All">Semua Bidang</option>
            <option value="Perumahan">Perumahan</option>
            <option value="Permukiman">Permukiman</option>
            <option value="RPM">RPM</option>
            <option value="Pusdatin">Pusdatin</option>
          </select>
          <select className="form-select w-auto" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="All">Semua Bulan</option>
            {months.map((m, idx) => <option key={idx} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="fw-bold">Distribusi Data per Bidang</h6>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="fw-bold">Status Data per Bidang</h6>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={latestBarData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="approved" stackId="a" fill="#00b894" />
                    <Bar dataKey="rejected" stackId="a" fill="#d63031" />
                    <Bar dataKey="pending" stackId="a" fill="#f1c40f" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Data yang Paling Sering Diunduh</h6>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={downloadData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0984e3" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Tren Unduhan Mingguan</h6>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={downloadTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="downloads" stroke="#00b894" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
